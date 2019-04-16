# node-red-contrib-ccxt
A Node-RED node implemented by CCXT. 

## Description
Now this node package supports the API for all **(133 Exchanges)** Crypto Exchanges in the world from [CCXT](https://github.com/ccxt/ccxt) node-RED package. More than **1500 APIS** implemented to be used.

For the latest updates see the [CHANGELOG.md](https://github.com/masalinas/node-red-contrib-ccxt/blob/master/CHANGELOG.md)

## Installation Instructions
```
npm install node-red-contrib-ccxt --save
```

## Exchanges supported

* 1BTCXE
* ACX
* Allcoin
* ANXPro
* Anybits
* BCEX
* Bibox
* BigONE
* Binance
* Bit2C
* bitbank
* BitBay
* Bitfinex
* Bitfinex v2
* bitFlyer
* Bitforex      
* Bithumb
* Bitibu
* bitkk
* Bitlish
* BitMarket
* BitMEX
* Bitsane
* Bitso
* Bitstamp
* Bitstamp v1
* Bittrex
* Bit-Z
* BL3P
* Bleutrade
* Braziliex
* BTC-Alpha
* BtcBox
* BTCChina
* BTCExchange
* BTC Markets
* BtcTrade.im
* BTC Trade UA
* BTCTurk
* Buda
* BX.in.th
* C-CEX
* CEX.IO
* CHBTC
* ChileBit
* COBINHOOD
* Coinbase
* Coinbase Prime
* Coinbase Pro
* coincheck
* CoinEgg
* CoinEx
* CoinExchange
* CoinFalcon
* coinfloor
* Coingi
* CoinMarketCap
* CoinMate
* coinnest
* CoinOne
* CoinSpot
* CoinTiger
* CoolCoin
* COSS
* CREX24
* Crypton
* Cryptopia
* Deribit
* DSX
* Ethfinex
* EXMO
* EXX
* FCoin
* flowBTC
* FoxBit
* FYB-SE
* FYB-SG
* Gatecoin
* Gate.io
* GDAX
* Gemini
* GetBTC
* HADAX
* HitBTC
* HitBTC v2
* Huobi Pro
* ice3x
* Independent Reserve
* INDODAX
* itBit
* jubi.com
* KKEX
* Kraken
* Kucoin
* KuCoin 2
* Kuna
* LakeBTC
* LBank
* Liqui
* Liquid
* LiveCoin
* luno
* Lykke
* Mercado Bitcoin
* MixCoins
* NegocieCoins
* Novaexchange
* OKCoin CNY
* OKCoin USD
* OKEX
* Paymium
* Poloniex
* QRYPTOS
* QuadrigaCX
* QUOINEX
* RightBTC
* SouthXchange
* SurBitcoin
* The Ocean
* TheRockTrading
* TideBit
* Tidex
* UEX
* Upbit
* UrduBit
* Vaultoro
* VBTC
* VirWoX
* xBTCe
* YoBit
* YUNBI
* Zaif
* ZB

## CCXT node-RED Configuration

* **Exchange**: Exchange name
* **API**: All public APIs normally are implemented by all exchanges. These API do not need to register in the Exchange. If select **Custom API** we will have access to all API to the Exchange. Some of them are public and other are private. The private API need to register in the Exchange and create secrets for the API to be accessed. Follow the help of the Exchange to create it.
* **Secrets**: only for **Custom API**. Permit create the secrets to access private API to the Exchange.
* **API Type**: only for **Custom API**. It represents the list of all API types offered by the Exchange.
* **API Name**: only for **Custom API**. It represents the name of the API selected. Consult the help of the Exchange to know if is necesary secrets to access to it.
* **API payload**: only for **Custom API**. Some API need a payload to be query. Consult the API help of the Exchange.

## Some examples

* List Bitcoin Balance in my wallet from Kraken exchange. This API is private so we need to register in the exchange and create the secrets (APIkey and Secret)

![ccxt_kraken_balance](https://user-images.githubusercontent.com/1216181/53039001-5ea66e80-347e-11e9-87c1-61bdf474ecf8.png)

* List OHLCV array for Doge/Bitcoin grouped in hours from 18/02/2019 from Bittrex Exchange. This API is public and we do not need to register in the Exchange to query this data.

![ccxt_bittrex_ohclv](https://user-images.githubusercontent.com/1216181/53039005-62d28c00-347e-11e9-936d-210b6c9f50a7.png)

In the **Example folder** of the node you have the flow of these two cases. Of course for the private one you must register in the Exchange and create the secrets.