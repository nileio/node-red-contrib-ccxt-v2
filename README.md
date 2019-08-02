# node-red-contrib-ccxt-v2

A Node-RED node to communicate with various crypto exchanges using CCXT library. The node now supports all Unified and Exchange-specific APIs.

Note this package has much more added features and changes from the original fork, so this is refactored to v2.

This is now in Beta testing with really cool new features as below :) Please create an issue for any question or suggestion.

**New Features**

- Automatic load of all unified and custom (exchange-specific) APIs.
- Supports a call to multiple exchanges at one time and for multiple markets !
- Now only the supported APIs by the exchange will be listed. TODO: configuration for overrides.
- Automatic detection of private and public APIs based on exchange capabilities. Private APIs only require API Key and Secret. TODO : support overrides.
- Links for the selected exchange API docs.
- Automatic detection of required and optional parameters for the selected Exchange.
- Dynamic flow input parameters.
- Cool searable drop-down lists based on select2 for easily finding the exchange or required API.
- much more to come ...

## Description

This node package supports all APIs which are provided by latest version of CCXT. The node acts as a relay proxy to the CCXT package which exectues all unified and custom calls.
Please check CCXT website for all supported exchanges.
As of the latest release, there are **(133 Exchanges)** Crypto Exchanges supported from [CCXT](https://github.com/ccxt/ccxt) node-RED package.

For the latest updates see the [CHANGELOG.md](https://github.com/masalinas/node-red-contrib-ccxt/blob/master/CHANGELOG.md)

## Installation Instructions

```
npm install node-red-contrib-ccxt-v2 --save
```

## CCXT node-RED Configuration


## Some examples

- Retrieve a list of all markets from all exchanges !

- List my Balances from Binance and Poloneix.

- fetch OHLCV for multiple markets from Bittrex exchange.


In the **Example folder** of the node you have the flow of these two cases. Of course for the private one you must register in the Exchange and create the secrets.

**To Do**
- have node.status for different stages
- Testing of all dynamic configuration based on msg or flow
- Testing of trade APIs
- update ReadMe and docs
- include one additional language
- fix slight typedInput drawing issue - box radius doesnot align evenly
- package select2 and test whole package
- better error handling for jquery get calls.
- review all error handling
- adding Currencies typedInput list
- support using msg & flow properties for amount & price
- supporting dynamic Exchange name using context
- support an option to retrieve all exchanges as an list.
- change static exchanges to latest exchanges from ccxt
- dynamic show of CCXT version used in tooltip or help
- Additional feature requests
- Submit to node-red-contrib repo
