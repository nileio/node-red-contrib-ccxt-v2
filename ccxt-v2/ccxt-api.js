module.exports = function (RED) {
  "use strict";

  // load package dependencies
  const ccxt = require("ccxt");
  const exchanges = require("./js/exchanges");

  //helper function needed for since arguments
  //returns milliseconds ephch time for a date
  // Date.prototype.getUnixTime = function() {
  //     return (this.getTime() / 1000) | 0;
  // };
  // Returns if value is a date object
  //function isDate(value) {
  //   return value instanceof Date;
  // }

  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  //}
  // Returns if a value is really a number
  function isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }
  function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }

  var errorHandler = function (err, req, res, next) {
    console.warn(err);
    res.sendStatus(500);
  };

  var callbackExchanges = function (req, res) {
    // get my own exchange collection which includes the friendly name of the exchange too
    // avoiding to create exchange objects for all exchanges

    // get all exchanges
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({exchange: exchanges.exchanges}));
  };

  var callbackExchangeCaps = function (req, res) {
    //added support to recieve multiple exchange for this call

    var rst = req.query.exchange;
    //   var exchangeSet = [];
    //let exchangeSet = new Set(exchangereq);
    let outputarr = [];
    for (let index = 0; index < rst.length; index++) {
      const ex = rst[index];

      // create the exchange object passing in exchange id
      var exchange = new ccxt[ex]({
        headers: {
          Connection: "keep-alive",
        },
      });
      let arr = [];
      if (exchange.has !== undefined) {
        arr = Object.entries(exchange.has)

          // filter only exchange caps with = true

          .filter(function (x) {
            // excluding caps that do not represent a unified API (exclude caps named as CORS/privateAPI/publicAPI)
            if (
              x[0] !== "CORS" &&
              x[0] !== "privateAPI" &&
              x[0] !== "publicAPI"
            ) {
              // include caps = true and also emulated
              if (x[1] === true || x[1] === "emulated") {
                return x;
              }
            }
          })
          .map(function (v) {
            //slice out and return only the name
            // console.log("checking for capability: ", v);

            var modarr = v.slice(0, 1);

            // DEBUG this by uncommenting the line to find which Unified API fails.
            // console.log(v[0]);

            // BUGFIX: when the capability does not exist in our exchanges.js file an error will be 'Cannot read property 'filter' of undefined'
            // This will yeild the exchange unusable and the config will not list any Unified APIs!
            // the capabilities change all the time with ccxt new versions and therefore exchanges.js cannot be kept in sync.
            // Workaround solution is to add the capability if it does not exist
            // this call will ensure that a new Unified API(not known to exchanges.js) is still possible to use.
            // We assume the API is private and requires a custom payload only. No special fields will be shown for this API though.
            if (!exchanges.allunfiedAPIs[v[0]])
              exchanges.allunfiedAPIs[v[0]] = ["private", "apipayload"];

            //lookup if the api is private : return true or false
            // then add to the temp array and return the final array
            modarr.push(
              exchanges.allunfiedAPIs[v[0]]
                .filter((x) => x === "private")
                .join()
                ? true
                : false
            );

            return modarr;
          });

        // if we only have one element just copy array
        if (index == 0 && arr.length > 0) outputarr = arr;

        if (index > 0 && arr.length > 0) {
          // inner join new array with existing array
          outputarr = arr.filter(function (c) {
            return outputarr.some((ov) => ov[0] === c[0]);
          });
        }
      }
    }

    res.setHeader("Content-Type", "application/json");
    // send out the array of all supported unified APIs of the exchange
    // including true or false for private apis
    res.send(JSON.stringify({caps: outputarr}));
  };

  var callbackExchangeSymbols = async function (req, res) {
    let rst = req.query.exchange;
    let outputarr = [];
    if (rst !== undefined) {
      try {
        for (let index = 0; index < rst.length; index++) {
          const ex = rst[index];

          // instantiate the exchange by id
          var exchange = new ccxt[ex]({
            headers: {
              Connection: "keep-alive",
            },
          });
          let marketsList = [];
          // note if fetchMarkets is unsupported then the final list will be empty or filled with other exchange
          // markets which support the call. this means that in the rare case that an exchange
          // does NOT support the call to fetchMarkets we may get an error message when executing the call to that exchange
          // that "symobol is not supported by the exchange"

          // load all markets from the exchange using fetchMarkets
          if (exchange.has["fetchMarkets"]) {
            let markets = await exchange.fetchMarkets();
            // get all supported symbols from the exchange
            marketsList = ccxt
              .sortBy(Object.values(markets), "symbol")
              .map((market) =>
                ccxt.omit(market, ["info", "limits", "precision", "fees"])
              )
              .map((x) => x.symbol);
            // if we only have one element just copy array
            if (index == 0) outputarr = marketsList;
            // if this is a second round we already have an array add to it
            if (index > 0 && marketsList.length > 0) {
              // inner join new array with incoming array
              outputarr = marketsList.filter(function (c) {
                return outputarr.some((ov) => ov === c);
              });
            }
          }
          //else loadMarkets ??
        }
        res.setHeader("Content-Type", "application/json");

        res.send(JSON.stringify({symbols: outputarr}));
      } catch (error) {
        console.log(error);
      }
    }
  };

  var callbackOHLCVTimeframes = function (req, res) {
    let rst = req.query.exchange;
    let outputarr = [];
    let defList = ["1m", "5m", "15m", "30m", "1h", "3h", "6h", "12h", "1d"];
    let emulated = false,
      unsupported = false,
      unsupportedby = "";
    try {
      for (let index = 0; index < rst.length; index++) {
        const ex = rst[index];

        // note here that if fetchOHLCV is unsupported then the final list will be a default list of timeframes
        // for any exchange supplied if fetchOHLCV is supported and yet no values are returned , this means the api is emulated
        // a default list will be used for building the final list in this case and emulated will be set to true for the whole payload
        // timeframes have default lists that can safely be used in most cases
        // even if the exchange api is emulated, we can still use a value from the default list
        // create the exchange object
        let exchange = new ccxt[ex]({
          headers: {
            Connection: "keep-alive",
          },
        });
        if (exchange.has["fetchOHLCV"]) {
          let tmpList = [];
          if (exchange.timeframes) tmpList = Object.keys(exchange.timeframes);
          if (tmpList === null || tmpList.length == 0) {
            emulated = true;
            tmpList = defList;
          }
          // if we only have one element just copy array
          if (index == 0) outputarr = tmpList;
          // if this is a second round we already have an array add to it
          if (index > 0 && tmpList.length > 0) {
            // inner join new array with incoming array
            outputarr = tmpList.filter(function (c) {
              return outputarr.some((ov) => ov === c);
            });
          }
        } else {
          //just return empty list response, the api is not supported by one of the exchanges supplied
          //but we should possibly return an error here
          unsupported = true;
          unsupportedby = exchange.name;
          //exit the loop if any of the exchnages does not support fetchOHLCV
          // this is done to avoid return of partial list
          index = rst.length + 1;
        }
      }

      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          results: {
            fetchOHLCVunsupported: unsupported,
            fetchOHLCVunsupportedby: unsupportedby,
            fetchOHLCVemulated: emulated,
            timeframes: outputarr,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  var flatten_api = function (orig_struct, label = "", depth = 0) {
    if (depth > 10) {
      throw new Error("Too much recursion: " + depth);
    }
    let hasverb = function (orig_struct) {
      var i_has_a_verb = false;
      Object.keys(orig_struct).forEach(function (key, i) {
        if (["get", "post", "put", "delete"].includes(key)) {
          i_has_a_verb = true;
          return;
        }
      });
      return i_has_a_verb;
    };

    let finalstruct = {};
    Object.keys(orig_struct).forEach(function (key, i) {
      //console.log("Current key: " + key);
      let tmplabel = label ? label + "_" + key : key;
      if (hasverb(orig_struct[key])) {
        finalstruct[tmplabel] = orig_struct[key];
      } else {
        let tmpstruct = flatten_api(orig_struct[key], tmplabel, depth + 1);
        Object.keys(tmpstruct).forEach(function (subkey, i) {
          finalstruct[subkey] = tmpstruct[subkey];
        });
      }
    });

    return finalstruct;
  };

  var callbackApis = function (req, res) {
    var exchange = req.query.exchange;

    // create the exchange object
    exchange = new ccxt[exchange]({
      headers: {
        Connection: "keep-alive",
      },
    });

    // get exchange.api which includes all custom apis
    // provided by the exchange categories into private/public and other groups
    res.setHeader("Content-Type", "application/json");

    res.send(JSON.stringify({api: flatten_api(exchange.api)}));
  };

  // returns parameters of the unified api
  // based on the signature of the api in the dictionary
  // loaded from our exchanges.js file
  var getApiParams = function (api, extended) {
    //TODO: implement extended as true/false
    //if true return a required/non-required for each param
    let arr = [],
      reqparams = [],
      optparams = [];

    // required parameters appear first and they are string
    // exclude the special parameter called private which is just an indicator that
    // the api requires credentials

    reqparams = exchanges.allunfiedAPIs[api].filter(
      (x) => typeof x === "string" && x !== "private"
    );

    // the set of optional parameters are defined as an array
    optparams = exchanges.allunfiedAPIs[api].filter(
      (x) => typeof x !== "string"
    );
    //if there are optional params return the names of optional parameters from the array
    if (optparams.length > 0) {
      optparams = optparams.map((x) => x)[0];
      //concatenate the required and optional params and close any gaps (closing gaps doesnt really work but it still OK)
      arr = reqparams.concat(optparams).filter(function () {
        return true;
      });
      //if we have required params. sometimes we only have optional params
    } else if (reqparams.length > 0)
      arr = reqparams.filter(function () {
        return true;
      });

    return arr;
  };

  var callbackApiParams = function (req, res) {
    let api = req.query.api;

    // create the exchange object
    let apiparams = getApiParams(api);
    res.setHeader("Content-Type", "application/json");

    res.send(JSON.stringify({apiparams: apiparams}));
  };

  var callbackExchangerequiredCredentials = function (req, res) {
    var exchange = req.query.exchange;

    //TODO: fix bug The Ocean exchange cannot be instantiated

    // create the exchange object passing in exchange id
    exchange = new ccxt[exchange]({
      headers: {
        Connection: "keep-alive",
      },
    });
    let arr = [];
    //("requiredCredentials");
    if (exchange.requiredCredentials !== undefined) {
      arr = Object.entries(exchange.requiredCredentials)
        // return requiredCredentials = true

        .filter(function (x) {
          if (x[1] === true) {
            return x;
          }
        })
        .map(function (v) {
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
    res.send(JSON.stringify({exchangereqcreds: arr}));
  };

  RED.httpAdmin.get(
    "/ccxt-v2/exchanges",
    RED.auth.needsPermission("ccxt-api-v2.read"),
    callbackExchanges,
    errorHandler
  );
  RED.httpAdmin.get(
    "/ccxt-v2/exchangecaps",
    RED.auth.needsPermission("ccxt-api-v2.read"),
    callbackExchangeCaps,
    errorHandler
  );
  RED.httpAdmin.get(
    "/ccxt-v2/apis",
    RED.auth.needsPermission("ccxt-api-v2.read"),
    callbackApis,
    errorHandler
  );
  RED.httpAdmin.get(
    "/ccxt-v2/apiparams",
    RED.auth.needsPermission("ccxt-api-v2.read"),
    callbackApiParams,
    errorHandler
  );
  RED.httpAdmin.get(
    "/ccxt-v2/exchangesymbols",
    RED.auth.needsPermission("ccxt-api-v2.read"),
    callbackExchangeSymbols,
    errorHandler
  );
  RED.httpAdmin.get(
    "/ccxt-v2/fetchOHLCVTimeframes",
    RED.auth.needsPermission("ccxt-api-v2.read"),
    callbackOHLCVTimeframes,
    errorHandler
  );
  RED.httpAdmin.get(
    "/ccxt-v2/exchangereqcreds",
    RED.auth.needsPermission("ccxt-exchange-v2.read"),
    callbackExchangerequiredCredentials,
    errorHandler
  );

  // node implementation
  function CcxtApi(config) {
    RED.nodes.createNode(this, config);
    //defaults
    this.exchange = config.exchange;
    this.allexchanges = config.allexchanges || false;
    this.apitype = config.apitype;
    this.customapitype = config.customapitype;
    this.api = config.api;
    this.apiprivate = config.apiprivate || false;
    this.filtermarkets = config.filtermarkets || "";
    this.filtermarketsType = config.filtermarketsType;
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
    this.amountType = config.amountType;
    this.orderprice = config.orderprice;
    this.orderpriceType = config.orderpriceType;
    this.orderid = config.orderid;
    this.orderidType = config.orderidType || "str";
    this.code = config.code;
    this.address = config.address;
    this.tag = config.tag;
    this.apisecrets = RED.nodes.getNode(config.apisecrets);
    this.apipayload = config.apipayload;
    this.apipayloadType = config.apipayloadType || "none";
    var node = this;

    // execute ccxt API
    node.on("input", function (msg) {
      const asyncInput = async function async(config) {
        //  let results = [];
        //  let res = 0;
        let exchangelist = node.exchange;
        var api = node.api.replace(node.customapitype + "_", "");

        if (node.allexchanges === true)
          if (api === "loadMarkets")
            exchangelist = Object.keys(exchanges.exchanges);
          else {
            node.error(
              "All exchanges can only be used with loadMarkets call.",
              msg
            );
            return;
          }

        for (let index = 0; index < exchangelist.length; index++) {
          const element = exchangelist[index];
          let addresult = false; // switch is default to false to return the result
          // connect to exchange selected
          var exchange = undefined;

          // obtain secrets if API is private
          // applies for both unified and custom(exchange-specific) APIs
          //      if Array.isArray(node.exchange) {
          try {
            //instantiate the exchange
            if (node.apiprivate === "true") {
              if (exchangelist.length > 1)
                RED.nodes.eachNode(function (n) {
                  // check if n is one you want
                  if (n.type === "ccxt-exchange-v2")
                    if (n.exchange === element)
                      if (n.defaultconfig === true) {
                        node.apisecrets = RED.nodes.getNode(n.id);
                        return;
                      }
                });

              if (node.apisecrets == undefined) {
                node.error(
                  "No Exchange credentials configured for this exchange. If using multiple exchanges for the call, ensure there is one API Keys config is a default.",
                  msg
                );
                return;
              }

              exchange = new ccxt[element]({
                apiKey: node.apisecrets.credentials.apikey,
                secret: node.apisecrets.credentials.secret,
                uid: node.apisecrets.credentials.uid,
                login: node.apisecrets.credentials.login,
                password: node.apisecrets.credentials.password,
                headers: {
                  Connection: "keep-alive",
                },
              });

              if (node.apisecrets.sandboxmode === true)
                exchange.setSandboxMode(true);
            } else
              exchange = new ccxt[element]({
                headers: {
                  Connection: "keep-alive",
                },
              });

            //enable the built-in rate-limiter
            exchange.enableRateLimit = true;

            node.status({
              fill: "blue",
              shape: "dot",
              text: exchange.name + " : " + node.api,
            });

            var getVal = function (param) {
              // the parameter name should always match the parameter name in the definitions file exchanges.js .
              // if no param match undefined would be returned

              var value = node[param];
              if (value === undefined) return undefined;
              // handle parameter by name
              if (param === "apipayload") {
                //here you should handle retrieving the value from all typedinput
                //none/json/jsonata/msg/flow

                if (node.apipayloadType === "none") value = undefined;
                if (node.apipayloadType === "json" && value != "")
                  value = JSON.parse(value);
                if (node.apipayloadType === "jsonata" && value != "")
                  value = RED.util.evaluateJSONataExpression(
                    RED.util.prepareJSONataExpression(value, node),
                    msg
                  );
                if (node.apipayloadType === "msg")
                  value = JSON.stringify(
                    RED.util.getMessageProperty(msg, node.apipayload)
                  );
                if (node.apipayloadType === "flow")
                  value = JSON.stringify(
                    RED.util.evaluateNodeProperty(
                      node.apipayload,
                      node.apipayloadType,
                      node,
                      msg
                    )
                  );
              }
              if (param === "orderid") {
                if (node.orderidType === "msg")
                  value = RED.util.getMessageProperty(msg, node.orderid);
                if (node.orderidType === "flow")
                  value = RED.util.evaluateNodeProperty(
                    node.orderid,
                    node.orderidType,
                    node,
                    msg
                  );
              }
              if (param === "amount") {
                if (node.amountType === "msg")
                  value = JSON.stringify(
                    RED.util.getMessageProperty(msg, node.amount)
                  );
                if (node.amountType === "flow")
                  value = RED.util.evaluateNodeProperty(
                    node.amount,
                    node.amountType,
                    node,
                    msg
                  );
              }
              if (param === "orderprice") {
                if (node.orderpriceType === "msg")
                  value = JSON.stringify(
                    RED.util.getMessageProperty(msg, node.orderprice)
                  );
                if (node.orderpriceType === "flow")
                  value = RED.util.evaluateNodeProperty(
                    node.orderprice,
                    node.orderpriceType,
                    node,
                    msg
                  );
              }
              // special handling for since argument to convert to milliseconds
              if (param === "since") {
                if (node.sinceType === "msg") {
                  value = RED.util.getMessageProperty(msg, node.since);
                }
                if (node.sinceType === "flow") {
                  value = RED.util.evaluateNodeProperty(
                    node.since,
                    node.sinceType,
                    node,
                    msg
                  );
                }
                if (
                  (value && node.sinceType === "json" && value != "") ||
                  isObject(value)
                ) {
                  Object.keys(value).forEach(function (key) {
                    if (value[key] !== null) {
                      if (isNumber(value[key]) === false && value[key] !== "") {
                        let newdate = new Date(value[key]);
                        value[key] = exchange.parse8601(newdate.toISOString());
                      }
                    } else value[key] = undefined;
                  });
                  value = JSON.parse(JSON.stringify(value));
                }
                // special handling for since parameter
                // make sure you get ISO string
                // the value can either be a number (long) or a date string or an object (key/value pair where key is symbol)
                // if the value is number then i assume its already in milliseconds UTC
                // if the value is not a number & not an object then i convert the date to milliseconds iso
                if (
                  value &&
                  isNumber(value) === false &&
                  value !== "" &&
                  isObject(value) === false
                ) {
                  value = new Date(value);
                  value = exchange.parse8601(value.toISOString());
                }
              }
              if (param === "timeframe") {
                if (node.timeframeType === "msg") {
                  value = RED.util.getMessageProperty(msg, node.timeframe);
                }
                if (node.timeframeType === "flow") {
                  value = RED.util.evaluateNodeProperty(
                    node.timeframe,
                    node.timeframeType,
                    node,
                    msg
                  );
                }
              }
              //market
              if (param === "symbol") {
                if (node.symbolType === "msg")
                  value = RED.util.getMessageProperty(msg, node.symbol);
                if (node.symbolType === "flow")
                  value = RED.util.evaluateNodeProperty(
                    node.symbol,
                    node.symbolType,
                    node,
                    msg
                  );
                if (node.symbolType === "allSymbols") value = exchange.symbols;
                // if (node.symbolType === "symbolList") value = value.split(",");
                if (value !== "" && !Array.isArray(value))
                  value = value.split(",");
              }
              //limit param
              if (param === "limit") {
                if (node.limitType === "msg") {
                  value = RED.util.getMessageProperty(msg, node.limit);
                }
                if (node.limitType === "flow") {
                  value = RED.util.evaluateNodeProperty(
                    node.limit,
                    node.limitType,
                    node,
                    msg
                  );
                }
              }

              if (value === "") value = undefined;
              return value;
            };

            //stream results back to client
            let returnResult = async function (resultObj, returnresult) {
              if (returnresult === true) {
                msg.payload = resultObj;
                node.send(msg);
              }
            };
            // prepareValue(msg,function(err,msg) {
            // if (err) {
            //     node.error(err);
            //     return;

            if (node.apitype === "unifiedAPI") {
              //3. we need special handling for multi-select of markets (symbols parameter) and using all symbols parameter

              if (api === "loadMarkets") {
                let payload = await exchange.loadMarkets(true);
                //filter output of markets if provided
                if (node.filtermarkets) {
                  let filterlist = [];
                  if (node.filtermarketsType === "str")
                    filterlist = node.filtermarkets.split(",");
                  if (node.filtermarketsType === "msg")
                    filterlist = RED.util
                      .getMessageProperty(msg, node.filtermarkets)
                      .split(",");
                  if (node.filtermarketsType === "flow")
                    filterlist = RED.util.evaluateNodeProperty(
                      node.filtermarkets,
                      node.filtermarketsType,
                      node,
                      msg
                    );
                  if (node.filtermarketsType === "json")
                    filterlist = JSON.parse(node.filtermarkets);
                  if (node.filtermarketsType === "jsonata")
                    filterlist = RED.util.evaluateJSONataExpression(
                      RED.util.prepareJSONataExpression(
                        node.filtermarkets,
                        node
                      ),
                      msg
                    );

                  //filter result here
                  payload = Object.keys(payload)
                    .filter((key) => filterlist.includes(key))
                    .reduce((obj, key) => {
                      obj[key] = payload[key];
                      return obj;
                    }, {});
                }
                //if we have markets after applying filters then return result showing the exchange and the markets available
                if (Object.entries(payload).length > 0) {
                  addresult = true;
                  returnResult(
                    {
                      exchange: exchange.name,
                      api: api,
                      payload: payload,
                    },
                    addresult
                  );
                }
              } else if (
                api === "fetchMarkets" &&
                exchange.has["fetchMarkets"]
              ) {
                let payload = await exchange.fetchMarkets();
                if (node.filtermarkets) {
                  let filterlist = [];
                  if (node.filtermarketsType === "str")
                    filterlist = node.filtermarkets.split(",");
                  if (node.filtermarketsType === "msg")
                    filterlist = RED.util
                      .getMessageProperty(msg, node.filtermarkets)
                      .split(",");
                  if (node.filtermarketsType === "flow")
                    filterlist = RED.util.evaluateNodeProperty(
                      node.filtermarkets,
                      node.filtermarketsType,
                      node,
                      msg
                    );
                  if (node.filtermarketsType === "json")
                    filterlist = JSON.parse(node.filtermarkets);
                  if (node.filtermarketsType === "jsonata")
                    filterlist = RED.util.evaluateJSONataExpression(
                      RED.util.prepareJSONataExpression(
                        node.filtermarkets,
                        node
                      ),
                      msg
                    );

                  //filter result here
                  payload = payload.filter((key) => {
                    return filterlist.includes(key.symbol);
                  });
                }
                if (payload.length > 0) {
                  addresult = true;
                  returnResult(
                    {
                      exchange: exchange.name,
                      api: api,
                      payload: payload,
                    },
                    addresult
                  );
                }
              }
              // handling for any Unified API apart from loadMarkets and fetchMarkets is here
              // make sure the exchange has the api and execute the api
              else if (exchange.has[api]) {
                addresult = true;
                let marketparam = false;
                let sinceparam = false;
                let marketpos = 0;
                let sincepos = 0;
                let counter = 0;
                //this call ensures that exchange has loaded all markets
                await exchange.loadMarkets(true);
                // return args and check if we have a markets parameter for this unifiedAPI
                // TODO : handling for arguments overrides. in some situations exchanges have specific
                // requirements for unifiedAPIs most notably some exchanges require api keys for all calls.
                let args = getApiParams(api).map((x) => {
                  if (x === "symbol") {
                    marketparam = true;
                    marketpos = counter;
                  }
                  //@nileio indicate that since is both symbol&since are params for this api
                  // required to support key/value for since param . since param position is always defined after the symbol param
                  if (marketparam && x === "since") {
                    sinceparam = true;
                    sincepos = counter;
                  }
                  counter++;
                  return getVal(x);
                });

                // call with arguments
                if (args.length > 0) {
                  //check if market param is used as one of the args
                  // this check is needed so that we can also loop over the markets if multiple markets provided

                  if (marketparam) {
                    // var marketresult;
                    let marketsarr = args[marketpos];
                    //result = {};
                    //[{ market: { symbol: null, result: null } }];
                    //  result = {};
                    let sleep = (ms) =>
                      new Promise((resolve) => setTimeout(resolve, ms));
                    //empty markets list?
                    if (marketsarr) {
                      // loop across all markets provided
                      let since_arg = sinceparam ? args[sincepos] : undefined;
                      for (let index = 0; index < marketsarr.length; index++) {
                        const element = marketsarr[index];
                        //@nileio check that the market symbol exists for this exchange prior to making the call.
                        if (exchange.symbols.includes(element)) {
                          args[marketpos] = element;
                          if (since_arg && isObject(since_arg)) {
                            //@nileio since parameter is key/value pair where key is the symbol and value is since
                            args[sincepos] = since_arg[element] || undefined;
                          }
                          //@nileio ratelimiting increase for any exchange by 200 millis!
                          //this is done to avoid bans- it does not seem that the internal rateLimiter of ccxt is doing anything!
                          if (index > 0) await sleep(exchange.rateLimit + 500);
                          // add a note about the market being queried for the call
                          // useful when there are many markets to use
                          node.status({
                            fill: "blue",
                            shape: "dot",
                            text:
                              exchange.name +
                              " : " +
                              node.api +
                              " - " +
                              (marketsarr.length - index).toString() +
                              " : " +
                              element,
                          });
                          //get the resulting payload then return as streaming msg
                          let payload = await exchange[api](...args);
                          returnResult(
                            {
                              exchange: exchange.name,
                              api: api,
                              arguments: args.concat(),
                              market: element,
                              payload: payload,
                            },
                            addresult
                          );
                        } else {
                          //the symbol provided does not exist for this exchange
                          // node.warn(`${element} skipped. Symbol is not found at ${exchange.name} exchange.`);
                        }
                      }
                      // market is a param of the api but no market is provided as an argument
                    } else {
                      let payload = await exchange[api](...args);
                      //console.log(payload);

                      returnResult(
                        {
                          exchange: exchange.name,
                          api: api,
                          arguments: args.concat(),
                          market: "",
                          payload: payload,
                        },
                        addresult
                      );
                    }
                  } else {
                    // market is not a param of this api
                    let payload = await exchange[api](...args);
                    returnResult(
                      {
                        exchange: exchange.name,
                        api: api,
                        arguments: args.concat(),
                        payload: payload,
                      },
                      addresult
                    );
                  }
                  // zero args required .. call without any arguments
                } else {
                  let payload = await exchange[api]();
                  returnResult(
                    {
                      exchange: exchange.name,
                      api: api,
                      arguments: "",
                      payload: payload,
                    },
                    addresult
                  );
                }
              }
            } else if (node.apitype === "customAPI") {
              //path parameters exist
              let hasPathParameters = /{(\w+)}/g.test(api);
              addresult = true;
              //replace special unwanted chars
              //this method will form the pattern public_get_method_name which is what ccxt provides for every custom method
              let method = api.replace(/\//g, "_").replace(/\-/g, "_");
              method = method.replace(/\{/g, "");
              method = method.replace(/\}/g, "");
              method = node.customapitype + "_" + method.toLowerCase();
              // issue #5
              // last character should never be an underscore as a result of previous replacement
              if (method.endsWith("_"))
                method = method.slice(0, method.length - 1);
              //invoke api without a payload param
              if (node.apipayloadType === "none") {
                if (hasPathParameters)
                  throw new Error(
                    "No values provided for API path parameters. Ensure you provide the required keys in the Payload."
                  );

                let payload = await exchange[method]();
                returnResult(
                  {
                    exchange: exchange.name,
                    api: api,
                    arguments: "", // iam using the property arguments so it is consistent with the unifiedAPI term. in face this is just the apipayload param
                    payload: payload,
                  },
                  addresult
                );
              }
              //invoke api with a payload params
              else if (node.apipayloadType === "json") {
                let parsedPayload = JSON.parse(node.apipayload);
                let payload = await exchange[method](parsedPayload);
                returnResult(
                  {
                    exchange: exchange.name,
                    api: api,
                    arguments: parsedPayload,
                    payload: payload,
                  },
                  addresult
                );
              } else if (node.apipayloadType === "jsonata") {
                let parsedPayload = RED.util.evaluateJSONataExpression(
                  RED.util.prepareJSONataExpression(node.apipayload, node),
                  msg
                );
                let payload = await exchange[method](parsedPayload);
                returnResult(
                  {
                    exchange: exchange.name,
                    api: api,
                    arguments: parsedPayload,
                    payload: payload,
                  },
                  addresult
                );
              }
              //todo : handle msg and flow
              else if (node.apipayloadType === "msg") {
                let value = JSON.stringify(
                  RED.util.getMessageProperty(msg, node.apipayload)
                );
                let parsedPayload = JSON.parse(value);
                let payload = await exchange[method](parsedPayload);
                returnResult(
                  {
                    exchange: exchange.name,
                    api: api,
                    arguments: parsedPayload,
                    payload: payload,
                  },
                  addresult
                );

                //custom api with no apipayload param - defaults
              } else {
                let payload = await exchange[method]();
                returnResult(
                  {
                    exchange: exchange.name,
                    api: api,
                    arguments: "",
                    payload: payload,
                  },
                  addresult
                );
              }
            } else {
              node.status({
                fill: "yellow",
                shape: "ring",
                text: "Node Configuration Error. Check that all required parameters for the call are set.",
              });
              node.warn("CCXT API configuration error");
            }

            // clear any node error
          } catch (err) {
            addresult = node.status({
              fill: "red",
              shape: "ring",
              text: "API err: " + err.message,
            });

            node.error(err.message, msg);

            // return;
          }
        }
        // clear any node error
        node.status({});
      };

      asyncInput.apply(this, [config]);
    });
    node.on("close", function (removed, done) {
      if (done) done();
    });
  }

  RED.nodes.registerType("ccxt-api-v2", CcxtApi);

  //config node implementation
  function CcxtExchange(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.defaultconfig = config.defaultconfig;
    this.activeconfig = config.activeconfig;
    this.sandboxmode = config.sandboxmode;
  }

  RED.nodes.registerType("ccxt-exchange-v2", CcxtExchange, {
    credentials: {
      apikey: {type: "text"},
      secret: {type: "text"},
      uid: {type: "text"},
      login: {type: "text"},
      password: {type: "password"},
    },
  });
};
