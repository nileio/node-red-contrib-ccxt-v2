TODO: README & docs

This package is now way different from the fork, will possibly re-base with original author credits.
This is work in progress, unfinished ...

**New Features**

-   Automatic load of all unified and custom (exchange-specific) APIs.
-   Now only the supported APIs by the exchange will be listed.
-   Automatic detection of private and public APIs. Private APIs only require API Key and Secret.
-   Links for the selected exchange API docs.
-   Automatic detection of required and optional parameters for the selected Exchange.
-   Dynamic flow input parameters.
-   Cool searable drop-down lists for easily finding the exchange or required API.
-   much more to come ...

# node-red-contrib-ccxt

A Node-RED node implemented by CCXT.

## Description

Now this node package supports all APIs which are provided by CCXT. The node acts as a relay proxy to the CCXT package which exectues all calls.
Please check CCXT website for all supported excahgnes.
As of the latest release, there are **(133 Exchanges)** Crypto Exchanges in the world from [CCXT](https://github.com/ccxt/ccxt) node-RED package.

For the latest updates see the [CHANGELOG.md](https://github.com/masalinas/node-red-contrib-ccxt/blob/master/CHANGELOG.md)

## Installation Instructions

```
npm install node-red-contrib-ccxt --save
```

## All Exchanges supported by ccxt are included

## CCXT node-RED Configuration

-   **Exchange**: Exchange name
-   **API**: All public APIs normally are implemented by all exchanges. These API do not need to register in the Exchange. If select **Custom API** we will have access to all API to the Exchange. Some of them are public and other are private. The private API need to register in the Exchange and create secrets for the API to be accessed. Follow the help of the Exchange to create it.
-   **Secrets**: only for **Custom API**. Permit create the secrets to access private API to the Exchange.
-   **API Type**: only for **Custom API**. It represents the list of all API types offered by the Exchange.
-   **API Name**: only for **Custom API**. It represents the name of the API selected. Consult the help of the Exchange to know if is necesary secrets to access to it.
-   **API payload**: only for **Custom API**. Some API need a payload to be query. Consult the API help of the Exchange.

## Some examples

-   List Bitcoin Balance in my wallet from Kraken exchange. This API is private so we need to register in the exchange and create the secrets (APIkey and Secret)

![ccxt_kraken_balance](https://user-images.githubusercontent.com/1216181/53039001-5ea66e80-347e-11e9-87c1-61bdf474ecf8.png)

-   List OHLCV array for Doge/Bitcoin grouped in hours from 18/02/2019 from Bittrex Exchange. This API is public and we do not need to register in the Exchange to query this data.

![ccxt_bittrex_ohclv](https://user-images.githubusercontent.com/1216181/53039005-62d28c00-347e-11e9-936d-210b6c9f50a7.png)

In the **Example folder** of the node you have the flow of these two cases. Of course for the private one you must register in the Exchange and create the secrets.

**To Do**

-   API payload is not required for some custom APIs. detect and remove error message on the node.
-   Add a help hover button or an area where the documentation of the API is displayed when selecting a custom API.
-   Add a persistent link to API doc when selecting an exchange. Info hover button to retrieve
-   exchange info or a description of the selected item somewhere.
-   Auto populate API payload for selected custom API.
-   Review custom API syntax for implicit calls.
