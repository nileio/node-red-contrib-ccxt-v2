"use strict";
const ccxt = require("ccxt");
//depends on the following ccxt version
//will be updated manually once an update to ccxt package is installed

//ccxt.version
// binding to ccxt version
const version = ccxt.version; //"1.18.630";

//this list match the latest list from ccxt module. update as necessary
const exchanges = function() {
  let newObj = {};
  let arrNames = [];

  ccxt.exchanges.forEach(function(id) {
    let arrValues = [];

    let name = "";
    try {
      //try to instantiate the exchange, it will throw error if exchange cant be instantiated
      let exch = new ccxt[id]();
      //this is super cool :)
      // i check if the name is duplicate then beatuifully just add the last char from id which is usually a number
      // in order to avoid duplicated name
      try {
        if (arrNames.indexOf(exch.name) >= 0)
          name = exch.name + id.charAt(id.toString().length - 1);
        else name = exch.name;
      } catch (err) {
        console.log("name duplicated error for:", exch.name);
        //in case of fallback error, the duplicate name will appear in the menu, however the id is different.
        name = exch.name;
      }
      if (!unsupportedExchanges[id]) {
        arrNames.push(name);
        arrValues.push(name);
        arrValues.push(exch.urls.www);
        arrValues.push(exch.urls.logo);
        arrValues.push(exch.urls.doc);
        //newObj[id] = myExchanges[id];
        newObj[id] = arrValues;
      }
    } catch (err) {
      console.log("Error trying to instantiate exchange: ", id, err);
    }
  });
  return newObj;
};

// list of any exchanges I would like to exclude for any reason such as untested, unreliable, buggy,etc.

const unsupportedExchanges = {
  // crypton: "Crypton",
};
// in most cases payload (refered to as params in ccxt docs is not required)
// for some exchanges this parameter maybe needed but is usually optional
// consult with exchange docs
const allunifiedAPIs = {
  fetchMarkets: [],

  //Currently i am not having any special handling for required vs optional. will be in the next release to add an indication to required params
  loadMarkets: [["load-markets"]],
  fetchTicker: ["symbol", ["apipayload"]],
  fetchTickers: ["symbol", ["apipayload"]],
  fetchOrderBook: ["symbol", ["limit", "apipayload"]],
  fetchOrderBooks: ["symbol", ["apipayload"]],
  fetchL2OrderBook: ["symbol", ["limit", "apipayload"]],
  fetchTrades: ["private", "symbol", ["since", "limit", "apipayload"]],
  fetchOHLCV: ["symbol", ["timeframe", "since", "limit", "apipayload"]],
  fetchBalance: ["private", ["apipayload"]],
  createOrder: [
    "private",
    "symbol",
    "ordertype",
    "orderside",
    "amount",
    ["orderprice", "apipayload"]
  ],
  createMarketOrder: ["private", "symbol", "orderside", "amount", ["apipayload"]],
  createMarketBuyOrder: ["private", "symbol", "amount", ["apipayload"]],
  createMarketSellOrder: ["private", "symbol", "amount", ["apipayload"]],
  createLimitOrder: [
    "private",
    "symbol",
    "orderside",
    "amount",
    "orderprice",
    ["apipayload"]
  ],
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
  fetchCurrencies: ["apipayload"],
  fetchAccounts: ["apipayload"],
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
  fetchFundingFee: ["private", "code", ["apipayload"]],
  fetchTradingFees: ["private", "apipayload"],
  fetchAllTradingFees: ["private", "apipayload"],
  fetchTradingFee: ["private", "symbol", ["apipayload"]],
  fetchFees: ["private", "apipayload"],
  fetchTradingLimits: ["private", "symbol", ["apipayload"]],
  futures: [["apipayload"]] // I dont know how to use futures .. some exchanges have this capabilitylike OKEx
};

//-----------------------------------------------------------------------------

module.exports = Object.assign(
  { exchanges: exchanges(), allunfiedAPIs: allunifiedAPIs },
  exchanges,
  allunifiedAPIs
);

//-----------------------------------------------------------------------------
