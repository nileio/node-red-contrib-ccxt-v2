module.exports = function(RED) {
    "use strict";

    // load package dependencies
    var serveStatic = require("serve-static");
    var path = require("path");
    const ccxt = require("ccxt");
    const exchanges = require("./js/exchanges");

    //helper function needed for since arguments
    //returns milliseconds ephch time for a date
    // Date.prototype.getUnixTime = function() {
    //     return (this.getTime() / 1000) | 0;
    // };
    // load RED app server and settings
    var app = RED.httpNode;
    // var settings = RED.settings;

    // configure image static folder
    app.use("/", serveStatic(path.join(__dirname, "images")));

    // node implementation
    function CcxtApi(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        // bind apiMethods
        if (RED.settings.httpNodeRoot !== false) {
            node.errorHandler = function(err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            node.callbackExchanges = function(req, res) {
                // get my own exchange collection which includes the friendly name of the exchange too
                // avoiding to create exchange objects for all exchanges

                // get all exchanges
                res.setHeader("Content-Type", "application/json");
                res.send(
                    JSON.stringify({ exchange: exchanges.exchanges })
                );
            };

            node.callbackExchangeCaps = function(req, res) {
                console.log("github v5commit?");
                var exchange = req.query.exchange;

                //TODO: fix bug The Ocean exchange cannot be instantiated

                // create the exchange object passing in exchange id
                exchange = new ccxt[exchange]();
                let arr = [];
                if (exchange.has !== undefined) {
                    arr = Object.entries(exchange.has)
                        // filter only exchange caps with = true
                        // excluding caps that do not represent a unified API
                        .filter(function(x) {
                            if (
                                x[0] !== "CORS" &&
                                x[0] !== "privateAPI" &&
                                x[0] !== "publicAPI"
                            ) {
                                if (x[1] === true || x[1] === "emulated") {
                                    return x;
                                }
                            }
                        })
                        .map(function(v) {
                            //slice out and return only the name
                            var modarr = v.slice(0, 1);
                            //lookup if the api is private : return true or false
                            // then add to the temp array and return the final array
                            //Note: error will be Cannot read property 'filter' of undefined
                            // when the capability does not exist onmy list

                            modarr.push(
                                exchanges.allunfiedAPIs[v[0]]
                                    .filter(x => x === "private")
                                    .join()
                                    ? true
                                    : false
                            );
                            return modarr;
                        });
                    //each element of the array includes the name of the api
                    // and whether the api is private
                }
                res.setHeader("Content-Type", "application/json");
                // send out the array of all supported unified APIs of the exchange
                // including true or false for private apis
                res.send(JSON.stringify({ caps: arr }));
            };

            node.callbackExchangeSymbols = async function(req, res) {
                try {
                    let exchange = req.query.exchange;

                    // instantiate the exchange by id
                    exchange = new ccxt[exchange]();

                    // load all markets from the exchange
                    // should use await
                    let markets = await exchange.loadMarkets();
                    // get all supported symbols from the exchange
                    const marketsList = ccxt
                        .sortBy(Object.values(markets), "symbol")
                        .map(market =>
                            ccxt.omit(market, [
                                "info",
                                "limits",
                                "precision",
                                "fees"
                            ])
                        )
                        .map(x => x.symbol);

                    res.setHeader("Content-Type", "application/json");

                    res.send(JSON.stringify({ symbols: marketsList }));
                } catch (error) {
                    console.log(error);
                }
            };

            node.callbackApis = function(req, res) {
                var exchange = req.query.exchange;

                // create the exchange object
                exchange = new ccxt[exchange]();

                // get exchange.api which includes all custom apis
                // provided by the exchange categories into private/public and other groups
                res.setHeader("Content-Type", "application/json");

                res.send(JSON.stringify({ api: exchange.api }));
            };
            node.callbackApiParams = function(req, res) {
                let api = req.query.api;

                // create the exchange object
                let apiparams = getApiParams(api);
                res.setHeader("Content-Type", "application/json");

                res.send(JSON.stringify({ apiparams: apiparams }));
            };
            node.corsHandler = function(req, res, next) {
                next();
            };
        }

        app.get(
            "/exchanges",
            node.corsHandler,
            node.callbackExchanges,
            node.errorHandler
        );
        app.get(
            "/exchangecaps",
            node.corsHandler,
            node.callbackExchangeCaps,
            node.errorHandler
        );
        app.get(
            "/apis",
            node.corsHandler,
            node.callbackApis,
            node.errorHandler
        );
        app.get(
            "/apiparams",
            node.corsHandler,
            node.callbackApiParams,
            node.errorHandler
        );
        app.get(
            "/exchangesymbols",
            node.corsHandler,
            node.callbackExchangeSymbols,
            node.errorHandler
        );
        // returns parameters of the unified api
        // based on the signature of the api in the dictionary
        // loaded from our exchanges.js file
        function getApiParams(api, extended) {
            //TODO: implement extended as true/false
            //if true return a required/non-required for each param
            let arr = [],
                reqparams = [],
                optparams = [];

            reqparams = exchanges.allunfiedAPIs[api].filter(
                x => typeof x === "string" && x !== "private"
            );

            optparams = exchanges.allunfiedAPIs[api].filter(
                x => typeof x !== "string"
            );
            if (optparams.length > 0) {
                optparams = optparams.map(x => x)[0];
                arr = reqparams.concat(optparams).filter(function() {
                    return true;
                });
            } else if (reqparams.length > 0)
                arr = reqparams.filter(function() {
                    return true;
                });

            return arr;
        }
        // execute ccxt API
        node.on("input", function(msg) {
            const asyncInput = async function async(config) {
                try {
                    // connect to exchange selected
                    var exchange = undefined;

                    // obtain secrets if API is private
                    // applies for both unified and custom(exchange-specific) APIs

                    //instantiate the exchange
                    if (config.apiprivate === "true") {
                        var secret = RED.nodes.getNode(config.apisecrets);

                        if (secret == undefined) {
                            node.error(
                                "No Exchange credentials configured.",
                                msg
                            );
                            return;
                        }

                        exchange = new ccxt[config.exchange]({
                            apiKey: secret.credentials.apikey,
                            secret: secret.credentials.secret
                        });
                    } else exchange = new ccxt[config.exchange]();

                    var result;
                    var api = config.api;
                    //  var args = [];
                    //  returns the value for the parameter passed in
                    //  from the node.config
                    var getVal = function(x) {
                        // the parameter name should always match
                        // undefined would be returned
                        var value = config[x];
                        if (value === undefined || value === "")
                            return undefined;
                        // handle parameter by name
                        if (x === "apipayload") {
                            //here you should handle retrieving the value from all typedinput
                            //none/json/msg/flow

                            if (value !== "none") {
                                if (config[x].apipayloadType === "json") {
                                    return JSON.parse(value);
                                } else if (
                                    config[x].apipayloadType === "msg"
                                )
                                    return undefined;
                            } else return undefined;
                        }
                        if (x === "since") {
                            value = new Date(value);
                            // let pstring = Date.parse(value.toString());
                            return exchange.parse8601(value.toISOString());
                        }
                        return value;
                    };

                    if (config.apitype === "unifiedAPI") {
                        let args = getApiParams(api).map(x => getVal(x));

                        //execute the api
                        if (exchange.has[api]) {
                            if (args.length > 0)
                                result = await exchange[api](...args);
                            else result = await exchange[api]();
                        }
                    } else if (config.apitype === "customAPI") {
                        var impApiCall = api.replace(/\//g, "_");
                        impApiCall = impApiCall.replace("{", "");
                        impApiCall = impApiCall.replace("}", "");
                        impApiCall =
                            config.customapitype +
                            "_" +
                            impApiCall.toLowerCase();
                        if (config.apipayloadType === "none")
                            result = await exchange[impApiCall]();
                        else if (config.apipayloadType === "json")
                            result = await exchange[impApiCall](
                                JSON.parse(config.apipayload)
                            );
                        //todo : handle msg and flow
                        else result = await exchange[impApiCall]();
                    } else {
                        node.status({
                            fill: "yellow",
                            shape: "ring",
                            text:
                                "Node Configuration Error. Check all required parameters for the call are set."
                        });
                        node.warning("CCXT API configuration error");
                    }

                    // clear any node error
                    node.status({});

                    // send api result
                    msg.payload = result;

                    node.send(msg);
                } catch (err) {
                    node.status({
                        fill: "red",
                        shape: "ring",
                        text: "CCXT error"
                    });

                    node.error(err.message, msg);

                    return;
                }
            };

            asyncInput.apply(this, [config]);
        });
    }

    RED.nodes.registerType("ccxt-api", CcxtApi);

    //config node implementation
    function CcxtExchange(config) {
        RED.nodes.createNode(this, config);
    }

    RED.nodes.registerType("ccxt-exchange", CcxtExchange, {
        credentials: {
            apikey: { type: "text" },
            secret: { type: "text" }
        }
    });
};
