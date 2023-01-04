"use strict";
const ccxt = require("ccxt"),
  // depends on the following ccxt version
  // will be updated manually once an update to ccxt package is installed

  // ccxt.version
  // binding to ccxt version
  version = ccxt.version, // "1.47.46";
  // this list match the latest list from ccxt module. update as necessary
  exchanges = function () {
    let newObj = {},
      arrNames = [];

    ccxt.exchanges.forEach((id) => {
      let arrValues = [],
        name = "";

      try {
        // try to instantiate the exchange, it will throw error if exchange cant be instantiated
        if (!unsupportedExchanges[id]) {
          let exch = new ccxt[id]();
          // this is super cool :)
          // i check if the name is duplicate then beatuifully just add the last char from id which is usually a number
          // in order to avoid duplicated name

          try {
            if (arrNames.indexOf(exch.name) >= 0) {
              name = exch.name + id.charAt(id.toString().length - 1);
            } else {
              name = exch.name;
            }
          } catch (err) {
            console.log("exchange name duplicated error for:", exch.name);
            // in case of fallback error, the duplicate name will appear in the menu, however the id is different.
            name = exch.name;
          }

          arrNames.push(name);
          arrValues.push(name);
          arrValues.push(exch.urls.www);
          arrValues.push(exch.urls.logo);
          arrValues.push(exch.urls.doc);
          // newObj[id] = myExchanges[id];
          newObj[id] = arrValues;
        }
      } catch (err) {
        console.log("Error trying to instantiate exchange: ", id, err);
      }
    });
    return newObj;
  },
  // list of any exchanges I would like to exclude for any reason such as untested, unreliable, buggy,etc.

  unsupportedExchanges = {
    theocean: "The Ocean", // DEX currently require some specific modules that i cant get to work
    // gives errors in this version on trying to loadmarkets or other apis
    // most probably their public api requires an apiKey. some of them explicity reported the requirement for an apikey
    allcoin: "Allcoin",
    anybits: "Anybits",
    bcex: "BCEX",
    bitsane: "Bitsane",
    bitz: "Bitz",
    btcchina: "BTCChina",
    btcexchange: "BTCExchange",
    btctradeim: "BTCTradeim",
    ccex: "CCEX",
    chbtc: "CHBtc",
    coingi: "Coingi",
    cointiger: "Cointiger", // require api key for public
    coolcoin: "Coolcoin",
    flowbtc: "Flowbtc",
    liqui: "Liqui",
    mandala: "Mandala", // require api key for public
    okcoincny: "OkCoin Cny", // require api key for public
    stronghold: "Stronghold",
    uex: "UEX",
    xbtce: "XBTCE", // xbtce requires apiKey for all requests, their public API is always busy
  },
  // in most cases payload (refered to as params in ccxt docs is not required)
  // for some exchanges this parameter maybe needed but is usually optional
  // consult with exchange docs

  // Currently i am not having any special handling for required vs optional. will be in the next release to add an indication to required params
  allunifiedAPIs = {
    // both fetchMarkets and loadMarkets have special handling. they both return markets (in object and array formats).
    // optionally a filter can be provided as an array or comma separated list to return only the filtered markets
    fetchMarkets: [["filtermarkets"]], // returns an array
    loadMarkets: [["filtermarkets"]], // returns an object with key being market pair
    fetchTicker: ["symbol", ["apipayload"]],
    fetchTickers: ["symbol", ["apipayload"]],
    fetchOrderBook: ["private", "symbol", ["limit", "apipayload"]],
    fetchOrderBooks: ["symbol", ["apipayload"]],
    fetchL2OrderBook: ["symbol", ["limit", "apipayload"]],
    fetchTrades: ["symbol", ["since", "limit", "apipayload"]],
    fetchOHLCV: ["symbol", ["timeframe", "since", "limit", "apipayload"]],
    fetchBalance: ["private", ["apipayload"]],
    createOrder: ["private", "symbol", "ordertype", "orderside", "amount", ["orderprice", "apipayload"]],
    createMarketOrder: ["private", "symbol", "orderside", "amount", ["apipayload"]],
    createMarketBuyOrder: ["private", "symbol", "amount", ["apipayload"]],
    createMarketSellOrder: ["private", "symbol", "amount", ["apipayload"]],
    createLimitOrder: ["private", "symbol", "orderside", "amount", "orderprice", ["apipayload"]],
    createLimitBuyOrder: ["private", "symbol", "amount", "orderprice", ["apipayload"]],
    createLimitSellOrder: ["private", "symbol", "amount", "orderprice", ["apipayload"]],
    fetchOrder: ["private", "orderid", ["symbol", "apipayload"]],
    fetchOrderStatus: ["private", "orderid", ["symbol", "apipayload"]],
    fetchOrders: ["private", ["symbol", "since", "limit", "apipayload"]],
    fetchOpenOrders: ["private", ["symbol", "since", "limit", "apipayload"]],
    fetchOpenOrder: ["private", "orderid", ["symbol", "apipayload"]],
    fetchClosedOrders: ["private", ["symbol", "since", "limit", "apipayload"]],
    fetchOrderTrades: ["private", "orderid", ["symbol", "since", "limit", "apipayload"]],
    editOrder: ["private", "orderid", "symbol", ["apipayload"]],
    cancelOrder: ["private", "orderid", "symbol", ["apipayload"]],
    cancelOrders: ["private", "symbol", ["apipayload"]],
    cancelAllOrders: ["private", ["apipayload"]],
    fetchMyTrades: ["private", ["symbol", "since", "limit", "apipayload"]],
    fetchMySells: ["private", ["symbol", "since", "limit", "apipayload"]],
    fetchMyBuys: ["private", ["symbol", "since", "limit", "apipayload"]],
    fetchCurrencies: ["private", ["apipayload"]],
    fetchAccounts: ["private", ["apipayload"]],
    fetchDepositAddress: ["private", "code", ["apipayload"]],
    fetchDepositAddresses: ["private", ["codes", "apipayload"]],
    fetchDeposits: ["private", "code", ["since", "limit", "apipayload"]],
    createDepositAddress: ["private", "code", ["apipayload"]],
    fetchTransactions: ["private", "code", ["since", "limit", "apipayload"]],
    fetchWithdrawals: ["private", "code", ["since", "limit", "apipayload"]],
    withdraw: ["private", "code", "amount", "address", ["tag", "apipayload"]],
    deposit: ["private", "code", "amount", "address", ["tag", "apipayload"]],
    fetchLedger: ["private", "code", ["since", "limit", "apipayload"]],
    fetchLedgerEntry: ["private", "orderid", ["code", "apipayload"]],
    fetchBidsAsks: ["private", "symbol", ["apipayload"]],
    fetchFundingFees: ["private", "symbol", ["apipayload"]],
    fetchFundingRate: ["private", "symbol", ["apipayload"]],
    fetchFundingRates: ["private", "symbol", ["apipayload"]],
    fetchFundingRateHistory: ["private", "symbol", ["limit", "since", "apipayload"]],
    fetchFundingHistory: ["private", "symbol", ["since", "limit", "apipayload"]],
    fetchFundingFee: ["private", "code", ["apipayload"]],
    fetchTradingFees: ["private", "apipayload"],
    fetchAllTradingFees: ["private", "apipayload"],
    fetchTradingFee: ["private", "symbol", ["apipayload"]],
    fetchFees: ["private", "apipayload"],
    fetchTradingLimits: ["private", "symbol", ["apipayload"]],
    fetchTime: [["apipayload"]],
    fetchStatus: [["apipayload"]],
  };

// -----------------------------------------------------------------------------

module.exports = Object.assign({exchanges: exchanges(), allunfiedAPIs: allunifiedAPIs}, exchanges, allunifiedAPIs);

// -----------------------------------------------------------------------------
