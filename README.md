# node-red-contrib-ccxt-v2

A Node-RED node to communicate with various crypto exchanges using CCXT library. The node now supports all Unified and Exchange-specific APIs.

Note this package has much more added features and changes from the original fork, so this is refactored to v2.

This is now in Beta testing with really cool new features as below :) Please create an issue for any question or suggestion.

**New Features**

- Automatic load of all unified and custom (exchange-specific) APIs.
- Now only the supported APIs by the exchange will be listed.
- Automatic detection of private and public APIs based on exchange capabilities. Private APIs only require API Key and Secret.
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

- List Bitcoin Balance in my wallet from Kraken exchange.

![ccxt_kraken_balance](https://user-images.githubusercontent.com/1216181/53039001-5ea66e80-347e-11e9-87c1-61bdf474ecf8.png)

- List OHLCV array for Doge/Bitcoin grouped in hours from 18/02/2019 from Bittrex Exchange. This API is public and we do not need to register in the Exchange to query this data.

![ccxt_bittrex_ohclv](https://user-images.githubusercontent.com/1216181/53039005-62d28c00-347e-11e9-936d-210b6c9f50a7.png)

In the **Example folder** of the node you have the flow of these two cases. Of course for the private one you must register in the Exchange and create the secrets.

**To Do**
- Testing of dynamic configuration based on msg or flow
- Testing of trade APIs
- update ReadMe and docs
- include one additional language
- package select2 and test whole package
- better error handling for jquery get calls.
- review all error handling
- adding Currencies typedInput list
- support using msg & flow properties for amount & price
- supporting dynamic Exchange name
- support an option to retrieve all exchanges as an list.
- dynamic show of CCXT version used
- Additional feature requests
