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
    //defaults
    this.exchange = config.exchange;
    this.apitype = config.apitype;
    this.customapitype = config.customapitype;
    this.api = config.api;
    this.apiprivate = config.apiprivate || false;
    this.loadmarketsreload = config.loadmarketsreload || false;
    this.symbol = config.symbol;
    this.symbolType = config.symbolType || "str";
    this.limit = config.limit;
    this.limitType = config.limitType || "num";
    this.since = config.since;
    this.sinceType = config.sinceType || "datepick";
    this.timeframe = config.timeframe;
    this.timeframeType = config.timeframeType || "timeframeList";
    this.ordertype = config.ordertype || "limit";
    this.orderside = config.orderside || "buy";
    this.amount = config.amount;
    this.orderprice = config.orderprice;
    this.orderid = config.orderid;
    this.code = config.code;
    this.address = config.address;
    this.tag = config.tag;
    this.apisecrets = RED.nodes.getNode(config.apisecrets);
    this.apipayload = config.apipayload;
    this.apipayloadType = config.apipayloadType || "none";
    var node = this;
    // now you got config
    // and also you got node=this

    // here you should set all defaults for this node like this
    // node.x = y;

    // this.bytopic = n.bytopic || "all";
    // this.op1 = n.op1 || "1";
    // this.op2 = n.op2 || "0";
    // this.op1type = n.op1type || "str";
    // this.op2type = n.op2type || "str";

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
        res.send(JSON.stringify({ exchange: exchanges.exchanges }));
      };

      node.callbackExchangeCaps = function(req, res) {
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
              if (x[0] !== "CORS" && x[0] !== "privateAPI" && x[0] !== "publicAPI") {
                if (x[1] === true || x[1] === "emulated") {
                  return x;
                }
              }
            })
            .map(function(v) {
              //slice out and return only the name
              // console.log("checking for capability: ", v);
              var modarr = v.slice(0, 1);
              //lookup if the api is private : return true or false
              // then add to the temp array and return the final array
              //Note: error will be Cannot read property 'filter' of undefined
              // when the capability does not exist onmy list

              modarr.push(
                exchanges.allunfiedAPIs[v[0]].filter(x => x === "private").join()
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
          //let markets = await exchange.loadMarkets();
          let marketsList = [];
          if (exchange.has["fetchMarkets"]) {
            let markets = await exchange.fetchMarkets();
            // get all supported symbols from the exchange
            marketsList = ccxt
              .sortBy(Object.values(markets), "symbol")
              .map(market => ccxt.omit(market, ["info", "limits", "precision", "fees"]))
              .map(x => x.symbol);
          }

          res.setHeader("Content-Type", "application/json");

          res.send(JSON.stringify({ symbols: marketsList }));
        } catch (error) {
          console.log(error);
        }
      };
      node.callbackOHLCVTimeframes = function(req, res) {
        let exchange = req.query.exchange;

        // create the exchange object
        exchange = new ccxt[exchange]();

        res.setHeader("Content-Type", "application/json");

        if (exchange.has["fetchOHLCV"]) {
          res.send(
            JSON.stringify({
              timeframes: exchange.timeframes
            })
          );
        } else {
          //i should possibly end the response/raise error/
          // or send unsupported

          res.send(
            JSON.stringify({
              timeframes: "unsupported"
            })
          );
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
    // bind get apiMethods
    app.get("/exchanges", node.corsHandler, node.callbackExchanges, node.errorHandler);
    app.get(
      "/exchangecaps",
      node.corsHandler,
      node.callbackExchangeCaps,
      node.errorHandler
    );
    app.get("/apis", node.corsHandler, node.callbackApis, node.errorHandler);
    app.get("/apiparams", node.corsHandler, node.callbackApiParams, node.errorHandler);
    app.get(
      "/exchangesymbols",
      node.corsHandler,
      node.callbackExchangeSymbols,
      node.errorHandler
    );
    app.get(
      "/fetchOHLCVTimeframes",
      node.corsHandler,
      node.callbackOHLCVTimeframes,
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

      // required parameters appear first and they are string
      // exclude the special parameter called private which is just an indicator that
      // the api requires credentials

      reqparams = exchanges.allunfiedAPIs[api].filter(
        x => typeof x === "string" && x !== "private"
      );

      // the set of optional parameters are defined as an array
      optparams = exchanges.allunfiedAPIs[api].filter(x => typeof x !== "string");
      //if there are optional params return the names of optional parameters from the array
      if (optparams.length > 0) {
        optparams = optparams.map(x => x)[0];
        //concatenate the required and optional params and close any gaps (closing gaps doesnt really work but it still OK)
        arr = reqparams.concat(optparams).filter(function() {
          return true;
        });
        //if we have required params. sometimes we only have optional params
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
          if (node.apiprivate === "true") {
            //var secret = RED.nodes.getNode(config.apisecrets);

            if (node.apisecrets == undefined) {
              node.error("No Exchange credentials configured.", msg);
              return;
            }

            exchange = new ccxt[node.exchange]({
              apiKey: node.apisecrets.credentials.apikey,
              secret: node.apisecrets.credentials.secret,
              uid: node.apisecrets.credentials.uid,
              login: node.apisecrets.credentials.login,
              password: node.apisecrets.credentials.password
            });
          } else exchange = new ccxt[node.exchange]();

          var result;
          var api = node.api;

          //  var args = [];
          //  returns the value for the parameter passed in
          //  from the node.config
          /*                     function prepareValue(msg, done) {
                        // Either apply the jsonata expression or...
                        if (preparedEditExpression) {
                            RED.util.evaluateJSONataExpression(
                                preparedEditExpression,
                                msg,
                                (err, value) => {
                                    if (err) {
                                        done(
                                            RED._("debug.invalid-exp", {
                                                error: editExpression
                                            })
                                        );
                                    } else {
                                        done(null, {
                                            id: node.id,
                                            name: node.name,
                                            topic: msg.topic,
                                            msg: value,
                                            _path: msg._path
                                        });
                                    }
                                }
                            );
                        } else {
                            // Extract the required message property
                            var property = "payload";
                            var output = msg[property];
                            if (
                                node.complete !== "false" &&
                                typeof node.complete !== "undefined"
                            ) {
                                property = node.complete;
                                try {
                                    output = RED.util.getMessageProperty(
                                        msg,
                                        node.complete
                                    );
                                } catch (err) {
                                    output = undefined;
                                }
                            }
                            done(null, {
                                id: node.id,
                                z: node.z,
                                name: node.name,
                                topic: msg.topic,
                                property: property,
                                msg: output,
                                _path: msg._path
                            });
                        }
                    } */

          var getVal = function(param) {
            // the parameter name should always match the parameter name in the definitions file exchanges.js .
            // if no param match undefined would be returned

            //replacing config with node here
            var value = node[param];
            if (value === undefined || value === "") return undefined;
            // handle parameter by name
            if (param === "apipayload") {
              //here you should handle retrieving the value from all typedinput
              //none/json/msg/flow

              if (node.apipayloadType === "none") value = undefined;
              if (node.apipayloadType === "json") value = JSON.parse(value);
              if (node.apipayloadType === "msg")
                value = JSON.stringify(RED.util.getMessageProperty(msg, node.apipayload));
              if (node.apipayloadType === "flow")
                value = JSON.stringify(
                  RED.util.evaluateNodeProperty(node.apipayload, value, node, msg)
                );
            }
            // special handling for since argument to convert to milliseconds
            if (param === "since") {
              if (node.sinceType === "msg") {
                value = RED.util.getMessageProperty(msg, node.since);
              }
              if (node.sinceType === "flow") {
                value = RED.util.evaluateNodeProperty(node.since, value, node, msg);
              }
              //special handling for since parameter
              // make sure you get ISO string
              value = new Date(value);
              value = exchange.parse8601(value.toISOString());
            }
            if (param === "timeframe") {
              if (node.timeframeType === "msg") {
                value = RED.util.getMessageProperty(msg, node.timeframe);
              }
              if (node.sinceType === "flow") {
                value = RED.util.evaluateNodeProperty(node.timeframe, value, node, msg);
              }
            }

            if (param === "symbol") {
              if (node.symbolType === "msg")
                value = RED.util.getMessageProperty(msg, node.symbol);
              if (node.symbolType === "flow")
                value = RED.util.evaluateNodeProperty(node.symbol, value, node, msg);
            }
            return value;
          };

          // prepareValue(msg,function(err,msg) {
          // if (err) {
          //     node.error(err);
          //     return;
          // }

          if (node.apitype === "unifiedAPI") {
            //  result = await exchange.loadMarkets("true");
            let args = getApiParams(api).map(x => getVal(x));

            // make sure the exchange has the api and execute the api
            if (exchange.has[api]) {
              if (args.length > 0)
                // call with arguments
                result = await exchange[api](...args);
              // call without any arguments
              else result = await exchange[api]();
            }
          } else if (node.apitype === "customAPI") {
            var xcall = api.replace(/\//g, "_");
            xcall = xcall.replace(/\{/g, "");
            xcall = xcall.replace(/\}/g, "");
            xcall = node.customapitype + "_" + xcall.toLowerCase();

            //invoke api without a payload
            if (node.apipayloadType === "none") result = await exchange[xcall]();
            //invoke api with a payload
            else if (node.apipayloadType === "json")
              result = await exchange[xcall](JSON.parse(node.apipayload));
            //TODO : test msg
            else if (node.apipayloadType === "msg") {
              let value = JSON.stringify(
                RED.util.getMessageProperty(msg, node.apipayload)
              );
              result = await exchange[xcall](JSON.parse(value));
            }
            //todo : handle msg and flow
            else result = await exchange[xcall]();
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
          msg.cryptoexchange = {};
          msg.cryptoexchange.id = exchange.id;
          msg.cryptoexchange.name = exchange.name;
          msg.cryptoapi = node.api;
          msg.cryptoapitype = node.apitype;

          node.send(msg);
        } catch (err) {
          node.status({
            fill: "red",
            shape: "ring",
            text: "server err:" + err.message
          });

          node.error(err.message, msg);

          return;
        }
      };

      asyncInput.apply(this, [config]);
    });
  }

  RED.nodes.registerType("ccxt-api-v2", CcxtApi);

  //config node implementation
  function CcxtExchange(config) {
    RED.nodes.createNode(this, config);
    var node = this;
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
        res.send(JSON.stringify({ exchange: exchanges.exchanges }));
      };

      node.callbackExchangerequiredCredentials = function(req, res) {
        var exchange = req.query.exchange;

        //TODO: fix bug The Ocean exchange cannot be instantiated

        // create the exchange object passing in exchange id
        exchange = new ccxt[exchange]();
        let arr = [];
        //("requiredCredentials");
        if (exchange.requiredCredentials !== undefined) {
          arr = Object.entries(exchange.requiredCredentials)
            // return requiredCredentials = true

            .filter(function(x) {
              if (x[1] === true) {
                return x;
              }
            })
            .map(function(v) {
              //slice out and return only the name
              var modarr = v.slice(0, 1);
              //lookup if the api is private : return true or false
              // then add to the temp array and return the final array
              //Note: error will be Cannot read property 'filter' of undefined
              // when the capability does not exist onmy list. fix by adding the cap

              return modarr;
            });
          //each element of the array includes the name of the api
          // and whether the api is private
        }
        res.setHeader("Content-Type", "application/json");
        // send out the array of all supported unified APIs of the exchange
        // including true or false for private apis
        res.send(JSON.stringify({ exchangereqcreds: arr }));
      };

      node.corsHandler = function(req, res, next) {
        next();
      };
    }
    // bind get apiMethods
    app.get("/exchanges", node.corsHandler, node.callbackExchanges, node.errorHandler);
    app.get(
      "/exchangereqcreds",
      node.corsHandler,
      node.callbackExchangerequiredCredentials,
      node.errorHandler
    );
  }

  RED.nodes.registerType("ccxt-exchange-v2", CcxtExchange, {
    credentials: {
      apikey: { type: "text" },
      secret: { type: "text" },
      uid: { type: "text" },
      login: { type: "text" },
      password: { type: "password" }
    }
  });
};
