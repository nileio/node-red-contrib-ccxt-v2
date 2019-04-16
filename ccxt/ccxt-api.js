module.exports = function(RED) {
    "use strict";

    // load package dependencies
    var serveStatic = require('serve-static');
    var path = require('path');
    const ccxt = require('ccxt');
    const moment = require('moment');

    // load RED app server and settings
    var app = RED.httpNode;
    var settings = RED.settings;

    // configure image static folder
    app.use('/', serveStatic(path.join(__dirname, "images")));

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
                // get exchange collection                
                var exchanges = ccxt.exchanges;

                // get all exchanges
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ exchange: exchanges }));
            }

            node.callbackApiTypes = function(req, res) {
                var exchange = req.query.exchange;

                // create to exchange object passing in exchange id
                var exchange = new ccxt[exchange] ();

                // get all api types by exchange
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ type: Object.keys(exchange.api) }));
            } 

            node.callbackApis = function(req, res) {
                var exchange = req.query.exchange;
                var type = req.query.apitype;

                // create to exchange object
                var exchange = new ccxt[exchange] ();

                // get all apis from exchange and api type
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ api: exchange.api[type] }));
            } 

            node.corsHandler = function(req, res, next) { 
                next(); 
            }               
        }

        app.get('/exchanges', node.corsHandler, node.callbackExchanges, node.errorHandler);
        app.get('/apitypes', node.corsHandler, node.callbackApiTypes, node.errorHandler);
        app.get('/apis', node.corsHandler, node.callbackApis, node.errorHandler);        

        // execute ccxt API
        node.on('input', function (msg) {
            const asyncInput = async function async(config) {
                try {
                    // connect to exchange selected
                    var exchange = undefined;
                    
                    if (config.api == 'customAPI') {
                        var secret = RED.nodes.getNode(config.apisecrets);

                        if (secret == undefined) {
                            node.error('No Exchange credentials configured.', msg);                            
                            return;
                        }

                        exchange = new ccxt[config.exchange] (
                            {
                                apiKey: secret.credentials.apikey,
                                secret: secret.credentials.secret
                            }
                        );
                    }
                    else
                        exchange = new ccxt[config.exchange] ();                    

                    // execute api
                    var result;

                    var api = config.api;
                    
                    var loadmarketsreload = config.loadmarketsreload;
                    var fetchtickersymbol = config.fetchtickersymbol;
                    var orderbooksymbol = config.orderbooksymbol;
                    var fetchohlcvsymbol = config.fetchohlcvsymbol;
                    var fetchohlcvtimeframe = config.fetchohlcvtimeframe;
                    var fetchohlcvsince = config.fetchohlcvsince;
                    var fetchohlcvlimit = config.fetchohlcvlimit;
                    var fetchtradessymbol = config.fetchtradessymbol;
                    
                    if (api === "loadMarkets") {
                        result = await exchange.loadMarkets(loadmarketsreload);
                    } else if (api === "fetchMarkets") {
                        result = await exchange.fetchMarkets();
                    } else if (api === "fetchTicker") {
                        result = await exchange.fetchTicker(fetchtickersymbol);
                    } else if (api === "fetchTickers") {
                        result = await exchange.fetchTickers();
                    } else if (api === "fetchOrderBook") {
                        result = await exchange.fetchOrderBook(orderbooksymbol);
                    } else if (api === "fetchOHLCV") {
                        if (fetchohlcvsince !== undefined)
                            fetchohlcvsince = moment(fetchohlcvsince).valueOf();

                        result = await exchange.fetchOHLCV(fetchohlcvsymbol, fetchohlcvtimeframe, fetchohlcvsince, fetchohlcvlimit);
                    } else if (api === "fetchTrades") {
                        result = await exchange.fetchTrades(fetchtradessymbol);
                    } else if (api === "customAPI") {

                      var impApiCall = config.apicustom.replace("/","_");
                        impApiCall = impApiCall.replace("{","");
                        impApiCall = impApiCall.replace("}","");
                        impApiCall = config.apitype + '_' + impApiCall.toLowerCase();
                        result = await exchange[impApiCall](JSON.parse(config.apipayload));
                    } else {
                        node.status({fill:"yellow", shape: "ring", text: "CCXT API does not exist"});
                        node.warning("CCXT API does not exist");
                    }

                    // clear any node error
                    node.status({});

                    // send api result
                    msg.payload = result;

                    node.send(msg);
                } catch(err) {
                    node.status({fill:"red", shape: "ring", text: "CCXT error"});
                    
                    node.error(err.message, msg);

                    return;
                }
            };

            asyncInput.apply(this, [config]);
        });
    }

    RED.nodes.registerType('ccxt-api', CcxtApi);

    function CcxtExchange(config) {
        RED.nodes.createNode(this, config);
    }

    RED.nodes.registerType("ccxt-exchange", CcxtExchange, {
        credentials: {
            apikey: {type: "text"},
            secret: {type: "text"}
        } 
    });
}