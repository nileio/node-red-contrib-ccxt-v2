"use strict";
//depends on the following ccxt version
//will be updated manually once an update to ccxt package is installed

// binding to ccxt version
const version = "1.18.630";

//this list match the latest list from ccxt module. update as necessary

const exchanges = {
    _1btcxe: [
        "1BTCXE",
        "https://1btcxe.com/.",
        "https://user-images.githubusercontent.com/1294454/27766049-2b294408-5ecc-11e7-85cc-adaff013dc1a.jpg",
        "https://1btcxe.com/api-docs.php"
    ],
    acx: [
        "ACX",
        "https://acx.io/.",
        "https://user-images.githubusercontent.com/1294454/30247614-1fe61c74-9621-11e7-9e8c-f1a627afa279.jpg",
        "https://acx.io/documents/api_v2"
    ],
    allcoin: [
        "Allcoin",
        "https://www.allcoin.com/.",
        "https://user-images.githubusercontent.com/1294454/31561809-c316b37c-b061-11e7-8d5a-b547b4d730eb.jpg",
        "https://www.allcoin.com/api_market/market"
    ],
    anxpro: [
        "ANXPro",
        "https://anxpro.com/.",
        "https://user-images.githubusercontent.com/1294454/27765983-fd8595da-5ec9-11e7-82e3-adb3ab8c2612.jpg",
        "https://anxv2.docs.apiary.io/."
    ],
    anybits: [
        "Anybits",
        "https://anybits.com/.",
        "https://user-images.githubusercontent.com/1294454/41388454-ae227544-6f94-11e8-82a4-127d51d34903.jpg",
        "https://anybits.com/help/api"
    ],
    bcex: [
        "BCEX",
        "https://www.bcex.top/user/reg/type/2/pid/758978",
        "https://user-images.githubusercontent.com/1294454/43362240-21c26622-92ee-11e8-9464-5801ec526d77.jpg",
        "https://github.com/BCEX-TECHNOLOGY-LIMITED/API_Docs/wiki/Interface"
    ],
    bequant: [
        "Bequant",
        "https://hitbtc.com/?ref_id=5a5d39a65d466",
        "https://user-images.githubusercontent.com/1294454/55248342-a75dfe00-525a-11e9-8aa2-05e9dca943c6.jpg",
        "https://api.bequant.io/"
    ],
    bibox: [
        "Bibox",
        "https://www.bibox.com/signPage?id=11114745&lang=en",
        "https://user-images.githubusercontent.com/1294454/34902611-2be8bf1a-f830-11e7-91a2-11b2f292e750.jpg",
        "https://github.com/Biboxcom/api_reference/wiki/home_en"
    ],
    bigone: [
        "BigONE",
        "https://b1.run/users/new?code=D3LLBVFT",
        "https://user-images.githubusercontent.com/1294454/42803606-27c2b5ec-89af-11e8-8d15-9c8c245e8b2c.jpg",
        "https://open.big.one/docs/api.html"
    ],
    binance: [
        "Binance",
        "https://www.binance.com/?ref=10205187",
        "https://user-images.githubusercontent.com/1294454/29604020-d5483cdc-87ee-11e7-94c7-d1a8d9169293.jpg",
        "https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md"
    ],
    binanceje: [
        "Binance Jersey",
        "https://www.binance.je/?ref=35047921",
        "https://user-images.githubusercontent.com/1294454/54874009-d526eb00-4df3-11e9-928c-ce6a2b914cd1.jpg",
        "https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md"
    ],
    bit2c: [
        "Bit2C",
        "https://www.bit2c.co.il/.",
        "https://user-images.githubusercontent.com/1294454/27766119-3593220e-5ece-11e7-8b3a-5a041f6bcc3f.jpg",
        "https://www.bit2c.co.il/home/api"
    ],
    bitbank: [
        "bitbank",
        "https://bitbank.cc/",
        "https://user-images.githubusercontent.com/1294454/37808081-b87f2d9c-2e59-11e8-894d-c1900b7584fe.jpg",
        "https://docs.bitbank.cc/"
    ],
    bitbay: [
        "BitBay",
        "https://bitbay.net/.",
        "https://user-images.githubusercontent.com/1294454/27766132-978a7bd8-5ece-11e7-9540-bc96d1e9bbb8.jpg",
        "https://bitbay.net/public-api"
    ],
    bitfinex: [
        "Bitfinex",
        "https://www.bitfinex.com/.",
        "https://user-images.githubusercontent.com/1294454/27766244-e328a50c-5ed2-11e7-947b-041416579bb3.jpg",
        "https://docs.bitfinex.com/v1/docs"
    ],
    bitfinex2: [
        "Bitfinex2",
        "https://www.bitfinex.com/.",
        "https://user-images.githubusercontent.com/1294454/27766244-e328a50c-5ed2-11e7-947b-041416579bb3.jpg",
        "https://docs.bitfinex.com/v2/docs"
    ],
    bitflyer: [
        "bitFlyer",
        "https://bitflyer.jp/.",
        "https://user-images.githubusercontent.com/1294454/28051642-56154182-660e-11e7-9b0d-6042d1e6edd8.jpg",
        "https://lightning.bitflyer.com/docs?lang=en"
    ],
    bitforex: [
        "Bitforex",
        "https://www.bitforex.com/registered?inviterId=1867438",
        "https://user-images.githubusercontent.com/1294454/44310033-69e9e600-a3d8-11e8-873d-54d74d1bc4e4.jpg",
        "https://github.com/bitforexapi/API_Docs/wiki"
    ],
    bithumb: [
        "Bithumb",
        "https://www.bithumb.com/.",
        "https://user-images.githubusercontent.com/1294454/30597177-ea800172-9d5e-11e7-804c-b9d4fa9b56b0.jpg",
        "https://apidocs.bithumb.com/."
    ],
    bitibu: [
        "Bitibu",
        "https://bitibu.com/.",
        "https://user-images.githubusercontent.com/1294454/45444675-c9ce6680-b6d0-11e8-95ab-3e749a940de1.jpg",
        "https://bitibu.com/documents/api_v2"
    ],
    bitkk: [
        "bitkk",
        "https://vip.zb.com/user/register?recommendCode=bn070u",
        "https://user-images.githubusercontent.com/1294454/32859187-cd5214f0-ca5e-11e7-967d-96568e2e2bd1.jpg",
        "https://www.bitkk.com/i/developer"
    ],
    bitlish: [
        "Bitlish",
        "https://bitlish.com/.",
        "https://user-images.githubusercontent.com/1294454/27766275-dcfc6c30-5ed3-11e7-839d-00a846385d0b.jpg",
        "https://bitlish.com/api"
    ],
    bitmarket: [
        "BitMarket",
        "https://www.bitmarket.net/?ref=23323",
        "https://user-images.githubusercontent.com/1294454/27767256-a8555200-5ef9-11e7-96fd-469a65e2b0bd.jpg",
        "https://www.bitmarket.net/docs.php?file=api_public.html"
    ],
    bitmex: [
        "BitMEX",
        "https://www.bitmex.com/register/rm3C16",
        "https://user-images.githubusercontent.com/1294454/27766319-f653c6e6-5ed4-11e7-933d-f0bc3699ae8f.jpg",
        "https://www.bitmex.com/app/apiOverview"
    ],
    bitsane: [
        "Bitsane",
        "https://bitsane.com/.",
        "https://user-images.githubusercontent.com/1294454/41387105-d86bf4c6-6f8d-11e8-95ea-2fa943872955.jpg",
        "https://bitsane.com/help/api"
    ],
    bitso: [
        "Bitso",
        "https://bitso.com/?ref=itej",
        "https://user-images.githubusercontent.com/1294454/27766335-715ce7aa-5ed5-11e7-88a8-173a27bb30fe.jpg",
        "https://bitso.com/api_info"
    ],
    bitstamp: [
        "Bitstamp",
        "https://www.bitstamp.net/.",
        "https://user-images.githubusercontent.com/1294454/27786377-8c8ab57e-5fe9-11e7-8ea4-2b05b6bcceec.jpg",
        "https://www.bitstamp.net/api"
    ],
    bitstamp1: [
        "Bitstamp",
        "https://www.bitstamp.net/.",
        "https://user-images.githubusercontent.com/1294454/27786377-8c8ab57e-5fe9-11e7-8ea4-2b05b6bcceec.jpg",
        "https://www.bitstamp.net/api"
    ],
    bittrex: [
        "Bittrex",
        "https://bittrex.com/.",
        "https://user-images.githubusercontent.com/1294454/27766352-cf0b3c26-5ed5-11e7-82b7-f3826b7a97d8.jpg",
        "https://bittrex.github.io/api"
    ],
    bitz: [
        "Bit-Z",
        "https://u.bit-z.com/register?invite_code=1429193",
        "https://user-images.githubusercontent.com/1294454/35862606-4f554f14-0b5d-11e8-957d-35058c504b6f.jpg",
        "https://apidoc.bit-z.com/en"
    ],
    bl3p: [
        "BL3P",
        "https://bl3p.eu/.",
        "https://user-images.githubusercontent.com/1294454/28501752-60c21b82-6feb-11e7-818b-055ee6d0e754.jpg",
        "https://github.com/BitonicNL/bl3p-api/tree/master/docs"
    ],
    bleutrade: [
        "Bleutrade",
        "https://bleutrade.com/.",
        "https://user-images.githubusercontent.com/1294454/30303000-b602dbe6-976d-11e7-956d-36c5049c01e7.jpg",
        "https://bleutrade.com/help/API"
    ],
    braziliex: [
        "Braziliex",
        "https://braziliex.com/?ref=5FE61AB6F6D67DA885BC98BA27223465",
        "https://user-images.githubusercontent.com/1294454/34703593-c4498674-f504-11e7-8d14-ff8e44fb78c1.jpg",
        "https://braziliex.com/exchange/api.php"
    ],
    btcalpha: [
        "BTC-Alpha",
        "https://btc-alpha.com/?r=123788",
        "https://user-images.githubusercontent.com/1294454/42625213-dabaa5da-85cf-11e8-8f99-aa8f8f7699f0.jpg",
        "https://btc-alpha.github.io/api-docs"
    ],
    btcbox: [
        "BtcBox",
        "https://www.btcbox.co.jp/",
        "https://user-images.githubusercontent.com/1294454/31275803-4df755a8-aaa1-11e7-9abb-11ec2fad9f2d.jpg",
        "https://www.btcbox.co.jp/help/asm"
    ],
    btcchina: [
        "BTCChina",
        "https://www.btcchina.com/.",
        "https://user-images.githubusercontent.com/1294454/27766368-465b3286-5ed6-11e7-9a11-0f6467e1d82b.jpg",
        "https://www.btcchina.com/apidocs"
    ],
    btcexchange: [
        "BTCExchange",
        "https://www.btcexchange.ph/.",
        "https://user-images.githubusercontent.com/1294454/27993052-4c92911a-64aa-11e7-96d8-ec6ac3435757.jpg",
        "https://github.com/BTCTrader/broker-api-docs"
    ],
    btcmarkets: [
        "BTC Markets",
        "https://btcmarkets.net/.",
        "https://user-images.githubusercontent.com/1294454/29142911-0e1acfc2-7d5c-11e7-98c4-07d9532b29d7.jpg",
        "https://github.com/BTCMarkets/API"
    ],
    btctradeim: [
        "BtcTrade.im",
        "http://www.coinegg.com/user/register?invite=523218",
        "https://user-images.githubusercontent.com/1294454/36770531-c2142444-1c5b-11e8-91e2-a4d90dc85fe8.jpg",
        "https://www.btctrade.im/help.api.html"
    ],
    btctradeua: [
        "BTC Trade UA",
        "https://btc-trade.com.ua/.",
        "https://user-images.githubusercontent.com/1294454/27941483-79fc7350-62d9-11e7-9f61-ac47f28fcd96.jpg",
        "https://docs.google.com/document/d/1ocYA0yMy_RXd561sfG3qEPZ80kyll36HUxvCRe5GbhE/edit"
    ],
    btcturk: [
        "BTCTurk",
        "https://www.btcturk.com/.",
        "https://user-images.githubusercontent.com/1294454/27992709-18e15646-64a3-11e7-9fa2-b0950ec7712f.jpg",
        "https://github.com/BTCTrader/broker-api-docs"
    ],
    buda: [
        "Buda",
        "https://www.buda.com/.",
        "https://user-images.githubusercontent.com/1294454/47380619-8a029200-d706-11e8-91e0-8a391fe48de3.jpg",
        "https://api.buda.com/."
    ],
    bxinth: [
        "BX.in.th",
        "https://bx.in.th/.",
        "https://user-images.githubusercontent.com/1294454/27766412-567b1eb4-5ed7-11e7-94a8-ff6a3884f6c5.jpg",
        "https://bx.in.th/info/api"
    ],
    ccex: [
        "C-CEX",
        "https://c-cex.com/.",
        "https://user-images.githubusercontent.com/1294454/27766433-16881f90-5ed8-11e7-92f8-3d92cc747a6c.jpg",
        "https://c-cex.com/?id=api"
    ],
    cex: [
        "CEX.IO",
        "https://cex.io/r/0/up105393824/0",
        "https://user-images.githubusercontent.com/1294454/27766442-8ddc33b0-5ed8-11e7-8b98-f786aef0f3c9.jpg",
        "https://cex.io/cex-api"
    ],
    chbtc: [
        "CHBTC",
        "https://vip.zb.com/user/register?recommendCode=bn070u",
        "https://user-images.githubusercontent.com/1294454/28555659-f0040dc2-7109-11e7-9d99-688a438bf9f4.jpg",
        "https://www.chbtc.com/i/developer"
    ],
    chilebit: [
        "ChileBit",
        "https://chilebit.net/.",
        "https://user-images.githubusercontent.com/1294454/27991414-1298f0d8-647f-11e7-9c40-d56409266336.jpg",
        "https://blinktrade.com/docs"
    ],
    cobinhood: [
        "COBINHOOD",
        "https://cobinhood.com/.",
        "https://user-images.githubusercontent.com/1294454/35755576-dee02e5c-0878-11e8-989f-1595d80ba47f.jpg",
        "https://cobinhood.github.io/api-public"
    ],
    coinbase: [
        "Coinbase",
        "https://www.coinbase.com/join/58cbe25a355148797479dbd2",
        "https://user-images.githubusercontent.com/1294454/40811661-b6eceae2-653a-11e8-829e-10bfadb078cf.jpg",
        "https://developers.coinbase.com/api/v2"
    ],
    coinbaseprime: [
        "Coinbase Prime",
        "https://prime.coinbase.com/.",
        "https://user-images.githubusercontent.com/1294454/44539184-29f26e00-a70c-11e8-868f-e907fc236a7c.jpg",
        "https://docs.prime.coinbase.com/."
    ],
    coinbasepro: [
        "Coinbase Pro",
        "https://pro.coinbase.com/",
        "https://user-images.githubusercontent.com/1294454/41764625-63b7ffde-760a-11e8-996d-a6328fa9347a.jpg",
        "https://docs.pro.coinbase.com/"
    ],
    coincheck: [
        "coincheck",
        "https://coincheck.com/.",
        "https://user-images.githubusercontent.com/1294454/27766464-3b5c3c74-5ed9-11e7-840e-31b32968e1da.jpg",
        "https://coincheck.com/documents/exchange/api"
    ],
    coinegg: [
        "CoinEgg",
        "http://www.coinegg.com/user/register?invite=523218",
        "https://user-images.githubusercontent.com/1294454/36770310-adfa764e-1c5a-11e8-8e09-449daac3d2fb.jpg",
        "https://www.coinegg.com/explain.api.html"
    ],
    coinex: [
        "CoinEx",
        "https://www.coinex.com/account/signup?refer_code=yw5fz",
        "https://user-images.githubusercontent.com/1294454/38046312-0b450aac-32c8-11e8-99ab-bc6b136b6cc7.jpg",
        "https://github.com/coinexcom/coinex_exchange_api/wiki"
    ],
    coinexchange: [
        "CoinExchange",
        "https://www.coinexchange.io/.",
        "https://user-images.githubusercontent.com/1294454/34842303-29c99fca-f71c-11e7-83c1-09d900cb2334.jpg",
        "https://coinexchangeio.github.io/slate"
    ],
    coinfalcon: [
        "CoinFalcon",
        "https://coinfalcon.com/?ref=CFJSVGTUPASB",
        "https://user-images.githubusercontent.com/1294454/41822275-ed982188-77f5-11e8-92bb-496bcd14ca52.jpg",
        "https://docs.coinfalcon.com/."
    ],
    coinfloor: [
        "coinfloor",
        "https://www.coinfloor.co.uk/.",
        "https://user-images.githubusercontent.com/1294454/28246081-623fc164-6a1c-11e7-913f-bac0d5576c90.jpg",
        "https://github.com/coinfloor/api"
    ],
    coingi: [
        "Coingi",
        "https://coingi.com/.",
        "https://user-images.githubusercontent.com/1294454/28619707-5c9232a8-7212-11e7-86d6-98fe5d15cc6e.jpg",
        "https://coingi.docs.apiary.io/."
    ],
    coinmarketcap: [
        "CoinMarketCap",
        "https://coinmarketcap.com/.",
        "https://user-images.githubusercontent.com/1294454/28244244-9be6312a-69ed-11e7-99c1-7c1797275265.jpg",
        "https://coinmarketcap.com/api"
    ],
    coinmate: [
        "CoinMate",
        "https://coinmate.io/.?referral=YTFkM1RsOWFObVpmY1ZjMGREQmpTRnBsWjJJNVp3PT0",
        "https://user-images.githubusercontent.com/1294454/27811229-c1efb510-606c-11e7-9a36-84ba2ce412d8.jpg",
        "https://coinmate.docs.apiary.io/."
    ],
    coinnest: [
        "coinnest",
        "https://www.coinnest.co.kr/.",
        "https://user-images.githubusercontent.com/1294454/38065728-7289ff5c-330d-11e8-9cc1-cf0cbcb606bc.jpg",
        "https://www.coinnest.co.kr/doc/intro.html"
    ],
    coinone: [
        "CoinOne",
        "https://coinone.co.kr/.",
        "https://user-images.githubusercontent.com/1294454/38003300-adc12fba-323f-11e8-8525-725f53c4a659.jpg",
        "https://doc.coinone.co.kr/."
    ],
    coinspot: [
        "CoinSpot",
        "https://www.coinspot.com.au/.",
        "https://user-images.githubusercontent.com/1294454/28208429-3cacdf9a-6896-11e7-854e-4c79a772a30f.jpg",
        "https://www.coinspot.com.au/api"
    ],
    cointiger: [
        "CoinTiger",
        "https://www.cointiger.pro/exchange/register.html?refCode=FfvDtt",
        "https://user-images.githubusercontent.com/1294454/39797261-d58df196-5363-11e8-9880-2ec78ec5bd25.jpg",
        "https://github.com/cointiger/api-docs-en/wiki"
    ],
    coolcoin: [
        "CoolCoin",
        "http://www.coinegg.com/user/register?invite=523218",
        "https://user-images.githubusercontent.com/1294454/36770529-be7b1a04-1c5b-11e8-9600-d11f1996b539.jpg",
        "https://www.coolcoin.com/help.api.html"
    ],
    coss: [
        "COSS",
        "https://www.coss.io/c/reg?r=OWCMHQVW2Q",
        "https://user-images.githubusercontent.com/1294454/50328158-22e53c00-0503-11e9-825c-c5cfd79bfa74.jpg",
        "https://api.coss.io/v1/spec"
    ],
    crex24: [
        "CREX24",
        "https://crex24.com/?refid=slxsjsjtil8xexl9hksr",
        "https://user-images.githubusercontent.com/1294454/47813922-6f12cc00-dd5d-11e8-97c6-70f957712d47.jpg",
        "https://docs.crex24.com/trade-api/v2"
    ],
    crypton: [
        "Crypton",
        "https://cryptonbtc.com/.",
        "https://user-images.githubusercontent.com/1294454/41334251-905b5a78-6eed-11e8-91b9-f3aa435078a1.jpg",
        "https://cryptonbtc.docs.apiary.io/"
    ],
    //gone bankrupt on 15/05/2019
    // cryptopia: [
    //     "Cryptopia",
    //     "https://www.cryptopia.co.nz/Register?referrer=kroitor",
    //     "https://user-images.githubusercontent.com/1294454/29484394-7b4ea6e2-84c6-11e7-83e5-1fccf4b2dc81.jpg",
    //     "https://support.cryptopia.co.nz/csm?id=kb_article&sys_id=a75703dcdbb9130084ed147a3a9619bc"
    // ],
    deribit: [
        "Deribit",
        "https://www.deribit.com/reg-1189.4038",
        "https://user-images.githubusercontent.com/1294454/41933112-9e2dd65a-798b-11e8-8440-5bab2959fcb8.jpg",
        "https://docs.deribit.com/"
    ],
    dsx: [
        "DSX",
        "https://dsx.uk/.",
        "https://user-images.githubusercontent.com/1294454/27990275-1413158a-645a-11e7-931c-94717f7510e3.jpg",
        "https://api.dsx.uk/."
    ],
    ethfinex: [
        "Ethfinex",
        "https://www.ethfinex.com/.",
        "https://user-images.githubusercontent.com/1294454/37555526-7018a77c-29f9-11e8-8835-8e415c038a18.jpg",
        "https://bitfinex.readme.io/v1/docs"
    ],
    exmo: [
        "EXMO",
        "https://exmo.me/?ref=131685",
        "https://user-images.githubusercontent.com/1294454/27766491-1b0ea956-5eda-11e7-9225-40d67b481b8d.jpg",
        "https://exmo.me/en/api_doc?ref=131685"
    ],
    exx: [
        "EXX",
        "https://www.exx.com/r/fde4260159e53ab8a58cc9186d35501f",
        "https://user-images.githubusercontent.com/1294454/37770292-fbf613d0-2de4-11e8-9f79-f2dc451b8ccb.jpg",
        "https://www.exx.com/help/restApi"
    ],
    fcoin: [
        "FCoin",
        "https://www.fcoin.com/i/Z5P7V",
        "https://user-images.githubusercontent.com/1294454/42244210-c8c42e1e-7f1c-11e8-8710-a5fb63b165c4.jpg",
        "https://developer.fcoin.com/."
    ],
    fcoinjp: [
        "FCoinJP",
        "https://www.fcoinjp.com/.",
        "https://user-images.githubusercontent.com/1294454/54219174-08b66b00-4500-11e9-862d-f522d0fe08c6.jpg",
        "https://developer.fcoin.com/."
    ],
    flowbtc: [
        "flowBTC",
        "https://trader.flowbtc.com/.",
        "https://user-images.githubusercontent.com/1294454/28162465-cd815d4c-67cf-11e7-8e57-438bea0523a2.jpg",
        "https://www.flowbtc.com.br/api.html"
    ],
    foxbit: [
        "FoxBit",
        "https://foxbit.exchange/.",
        "https://user-images.githubusercontent.com/1294454/27991413-11b40d42-647f-11e7-91ee-78ced874dd09.jpg",
        "https://blinktrade.com/docs"
    ],
    fybse: [
        "FYB-SE",
        "https://www.fybse.se/.",
        "https://user-images.githubusercontent.com/1294454/27766512-31019772-5edb-11e7-8241-2e675e6797f1.jpg",
        "https://fyb.docs.apiary.io/."
    ],
    fybsg: [
        "FYB-SG",
        "https://www.fybsg.com/.",
        "https://user-images.githubusercontent.com/1294454/27766513-3364d56a-5edb-11e7-9e6b-d5898bb89c81.jpg",
        "https://fyb.docs.apiary.io/."
    ],
    gateio: [
        "Gate.io",
        "https://www.gate.io/signup/2436035",
        "https://user-images.githubusercontent.com/1294454/31784029-0313c702-b509-11e7-9ccc-bc0da6a0e435.jpg",
        "https://gate.io/api2"
    ],
    gdax: [
        "GDAX",
        "https://www.gdax.com/.",
        "https://user-images.githubusercontent.com/1294454/27766527-b1be41c6-5edb-11e7-95f6-5b496c469e2c.jpg",
        "https://docs.gdax.com/."
    ],
    gemini: [
        "Gemini",
        "https://gemini.com/.",
        "https://user-images.githubusercontent.com/1294454/27816857-ce7be644-6096-11e7-82d6-3c257263229c.jpg",
        "https://docs.gemini.com/rest-api"
    ],
    getbtc: [
        "GetBTC",
        "https://getbtc.org/.",
        "https://user-images.githubusercontent.com/1294454/33801902-03c43462-dd7b-11e7-992e-077e4cd015b9.jpg",
        "https://getbtc.org/api-docs.php"
    ],
    hadax: [
        "HADAX",
        "https://www.huobi.br.com/en-us/topic/invited?invite_code=rwrd3",
        "https://user-images.githubusercontent.com/1294454/38059952-4756c49e-32f1-11e8-90b9-45c1eccba9cd.jpg",
        "https://github.com/huobiapi/API_Docs/wiki"
    ],
    hitbtc: [
        "HitBTC",
        "https://hitbtc.com/?ref_id=5a5d39a65d466",
        "https://user-images.githubusercontent.com/1294454/27766555-8eaec20e-5edc-11e7-9c5b-6dc69fc42f5e.jpg",
        "https://github.com/hitbtc-com/hitbtc-api/blob/master/APIv1.md"
    ],
    hitbtc2: [
        "HitBTC2",
        "https://hitbtc.com/?ref_id=5a5d39a65d466",
        "https://user-images.githubusercontent.com/1294454/27766555-8eaec20e-5edc-11e7-9c5b-6dc69fc42f5e.jpg",
        "https://api.hitbtc.com/."
    ],
    huobipro: [
        "Huobi Pro",
        "https://www.huobi.br.com/en-us/topic/invited?invite_code=rwrd3",
        "https://user-images.githubusercontent.com/1294454/27766569-15aa7b9a-5edd-11e7-9e7f-44791f4ee49c.jpg",
        "https://github.com/huobiapi/API_Docs/wiki/REST_api_reference"
    ],
    huobiru: [
        "Huobi Russia",
        "https://www.huobi.com.ru/invite?invite_code=esc74",
        "https://user-images.githubusercontent.com/1294454/52978816-e8552e00-33e3-11e9-98ed-845acfece834.jpg",
        "https://github.com/cloudapidoc/API_Docs_en"
    ],
    ice3x: [
        "ICE3X",
        "https://ice3x.com/.?ref=14341802",
        "https://user-images.githubusercontent.com/1294454/38012176-11616c32-3269-11e8-9f05-e65cf885bb15.jpg",
        "https://ice3x.co.za/ice-cubed-bitcoin-exchange-api-documentation-1-june-2017"
    ],
    independentreserve: [
        "Independent Reserve",
        "https://www.independentreserve.com/.",
        "https://user-images.githubusercontent.com/1294454/30521662-cf3f477c-9bcb-11e7-89bc-d1ac85012eda.jpg",
        "https://www.independentreserve.com/API"
    ],
    indodax: [
        "INDODAX",
        "https://indodax.com/ref/testbitcoincoid/1",
        "https://user-images.githubusercontent.com/1294454/37443283-2fddd0e4-281c-11e8-9741-b4f1419001b5.jpg",
        "https://indodax.com/downloads/BITCOINCOID-API-DOCUMENTATION.pdf"
    ],
    itbit: [
        "itBit",
        "https://www.itbit.com/.",
        "https://user-images.githubusercontent.com/1294454/27822159-66153620-60ad-11e7-89e7-005f6d7f3de0.jpg",
        "https://api.itbit.com/docs"
    ],
    jubi: [
        "jubi.com",
        "https://www.jubi.com/.",
        "https://user-images.githubusercontent.com/1294454/27766581-9d397d9a-5edd-11e7-8fb9-5d8236c0e692.jpg",
        "https://www.jubi.com/help/api.html"
    ],
    kkex: [
        "KKEX",
        "https://kkex.com/.",
        "https://user-images.githubusercontent.com/1294454/47401462-2e59f800-d74a-11e8-814f-e4ae17b4968a.jpg",
        "https://kkex.com/api_wiki/cn"
    ],
    kraken: [
        "Kraken",
        "https://www.kraken.com/.",
        "https://user-images.githubusercontent.com/1294454/27766599-22709304-5ede-11e7-9de1-9f33732e1509.jpg",
        "https://www.kraken.com/en-us/help/api"
    ],
    kucoin: [
        "KuCoin",
        "https://www.kucoin.com/ucenter/signup?rcode=E5wkqe",
        "https://user-images.githubusercontent.com/1294454/51909432-b0a72780-23dd-11e9-99ba-73d23c8d4eed.jpg",
        "https://docs.kucoin.com/."
    ],
    kucoin2: [
        "KuCoin2",
        "https://www.kucoin.com/ucenter/signup?rcode=E5wkqe",
        "https://user-images.githubusercontent.com/1294454/51909432-b0a72780-23dd-11e9-99ba-73d23c8d4eed.jpg",
        "https://docs.kucoin.com/."
    ],
    kuna: [
        "Kuna",
        "https://kuna.io/.",
        "https://user-images.githubusercontent.com/1294454/31697638-912824fa-b3c1-11e7-8c36-cf9606eb94ac.jpg",
        "https://kuna.io/documents/api"
    ],
    lakebtc: [
        "LakeBTC",
        "https://www.lakebtc.com/.",
        "https://user-images.githubusercontent.com/1294454/28074120-72b7c38a-6660-11e7-92d9-d9027502281d.jpg",
        "https://www.lakebtc.com/s/api_v2"
    ],
    lbank: [
        "LBank",
        "https://www.lbank.info/sign-up.html?icode=7QCY&lang=en-US",
        "https://user-images.githubusercontent.com/1294454/38063602-9605e28a-3302-11e8-81be-64b1e53c4cfb.jpg",
        "https://github.com/LBank-exchange/lbank-official-api-docs"
    ],
    liqui: [
        "Liqui",
        "https://liqui.io/.",
        "https://user-images.githubusercontent.com/1294454/27982022-75aea828-63a0-11e7-9511-ca584a8edd74.jpg",
        "https://liqui.io/api"
    ],
    liquid: [
        "Liquid",
        "https://www.liquid.com/.?affiliate=SbzC62lt30976",
        "https://user-images.githubusercontent.com/1294454/45798859-1a872600-bcb4-11e8-8746-69291ce87b04.jpg",
        "https://developers.quoine.com/."
    ],
    livecoin: [
        "LiveCoin",
        "https://livecoin.net/?from=Livecoin-CQ1hfx44",
        "https://user-images.githubusercontent.com/1294454/27980768-f22fc424-638a-11e7-89c9-6010a54ff9be.jpg",
        "https://www.livecoin.net/api?lang=en"
    ],
    luno: [
        "luno",
        "https://www.luno.com/.",
        "https://user-images.githubusercontent.com/1294454/27766607-8c1a69d8-5ede-11e7-930c-540b5eb9be24.jpg",
        "https://www.luno.com/en/api"
    ],
    lykke: [
        "Lykke",
        "https://www.lykke.com/.",
        "https://user-images.githubusercontent.com/1294454/34487620-3139a7b0-efe6-11e7-90f5-e520cef74451.jpg",
        "https://hft-api.lykke.com/swagger/ui"
    ],
    mandala: [
        "Mandala",
        "https://trade.mandalaex.com/?ref=564377",
        "https://user-images.githubusercontent.com/1294454/54686665-df629400-4b2a-11e9-84d3-d88856367dd7.jpg",
        "https://documenter.getpostman.com/view/6273708/RznBP1Hh"
    ],
    mercado: [
        "Mercado Bitcoin",
        "https://www.mercadobitcoin.com.br/.",
        "https://user-images.githubusercontent.com/1294454/27837060-e7c58714-60ea-11e7-9192-f05e86adb83f.jpg",
        "https://www.mercadobitcoin.com.br/api-doc"
    ],
    mixcoins: [
        "MixCoins",
        "https://mixcoins.com/.",
        "https://user-images.githubusercontent.com/1294454/30237212-ed29303c-9535-11e7-8af8-fcd381cfa20c.jpg",
        "https://mixcoins.com/help/api"
    ],
    negociecoins: [
        "NegocieCoins",
        "https://www.negociecoins.com.br/.",
        "https://user-images.githubusercontent.com/1294454/38008571-25a6246e-3258-11e8-969b-aeb691049245.jpg",
        "https://www.negociecoins.com.br/documentacao-tradeapi"
    ],
    nova: [
        "Novaexchange",
        "https://novaexchange.com/.",
        "https://user-images.githubusercontent.com/1294454/30518571-78ca0bca-9b8a-11e7-8840-64b83a4a94b2.jpg",
        "https://novaexchange.com/remote/faq"
    ],
    okcoincny: [
        "OKCoin CNY",
        "https://www.okcoin.cn/.",
        "https://user-images.githubusercontent.com/1294454/27766792-8be9157a-5ee5-11e7-926c-6d69b8d3378d.jpg",
        "https://www.okcoin.cn/rest_getStarted.html"
    ],
    okcoinusd: [
        "OKCoin USD",
        "https://www.okcoin.com/.",
        "https://user-images.githubusercontent.com/1294454/27766791-89ffb502-5ee5-11e7-8a5b-c5950b68ac65.jpg",
        "https://www.okcoin.com/docs/en"
    ],
    okex: [
        "OKEX",
        "https://www.okex.com/.",
        "https://user-images.githubusercontent.com/1294454/32552768-0d6dd3c6-c4a6-11e7-90f8-c043b64756a7.jpg",
        "https://github.com/okcoin-okex/API-docs-OKEx.com"
    ],
    paymium: [
        "Paymium",
        "https://www.paymium.com/.",
        "https://user-images.githubusercontent.com/1294454/27790564-a945a9d4-5ff9-11e7-9d2d-b635763f2f24.jpg",
        "https://github.com/Paymium/api-documentation"
    ],
    poloniex: [
        "Poloniex",
        "https://poloniex.com/.",
        "https://user-images.githubusercontent.com/1294454/27766817-e9456312-5ee6-11e7-9b3c-b628ca5626a5.jpg",
        "https://docs.poloniex.com/."
    ],
    quadrigacx: [
        "QuadrigaCX",
        "https://www.quadrigacx.com/?ref=laiqgbp6juewva44finhtmrk",
        "https://user-images.githubusercontent.com/1294454/27766825-98a6d0de-5ee7-11e7-9fa4-38e11a2c6f52.jpg",
        "https://www.quadrigacx.com/api_info"
    ],
    rightbtc: [
        "RightBTC",
        "https://www.rightbtc.com/.",
        "https://user-images.githubusercontent.com/1294454/42633917-7d20757e-85ea-11e8-9f53-fffe9fbb7695.jpg",
        "https://52.53.159.206/api/trader"
    ],
    southxchange: [
        "SouthXchange",
        "https://www.southxchange.com/.",
        "https://user-images.githubusercontent.com/1294454/27838912-4f94ec8a-60f6-11e7-9e5d-bbf9bd50a559.jpg",
        "https://www.southxchange.com/Home/Api"
    ],
    stronghold: [
        "Stronghold",
        "https://stronghold.co/.",
        "https://user-images.githubusercontent.com/1294454/52160042-98c1f300-26be-11e9-90dd-da8473944c83.jpg",
        "https://docs.stronghold.co/."
    ],
    surbitcoin: [
        "SurBitcoin",
        "https://surbitcoin.com/.",
        "https://user-images.githubusercontent.com/1294454/27991511-f0a50194-6481-11e7-99b5-8f02932424cc.jpg",
        "https://blinktrade.com/docs"
    ],
    // // this is a DEX. It is not working atm so will disable it
    // theocean: [
    //     "The Ocean",
    //     "https://theocean.trade/.",
    //     "https://user-images.githubusercontent.com/1294454/43103756-d56613ce-8ed7-11e8-924e-68f9d4bcacab.jpg",
    //     "https://docs.theocean.trade/."
    // ],
    therock: [
        "TheRockTrading",
        "https://therocktrading.com/.",
        "https://user-images.githubusercontent.com/1294454/27766869-75057fa2-5ee9-11e7-9a6f-13e641fa4707.jpg",
        "https://api.therocktrading.com/doc/v1/index.html"
    ],
    tidebit: [
        "TideBit",
        "http://bit.ly/2IX0LrM",
        "https://user-images.githubusercontent.com/1294454/39034921-e3acf016-4480-11e8-9945-a6086a1082fe.jpg",
        "https://www.tidebit.com/documents/api/guide"
    ],
    tidex: [
        "Tidex",
        "https://tidex.com/.",
        "https://user-images.githubusercontent.com/1294454/30781780-03149dc4-a12e-11e7-82bb-313b269d24d4.jpg",
        "https://tidex.com/exchange/public-api"
    ],
    uex: [
        "UEX",
        "https://www.uex.com/signup.html?code=VAGQLL",
        "https://user-images.githubusercontent.com/1294454/43999923-051d9884-9e1f-11e8-965a-76948cb17678.jpg",
        "https://download.uex.com/doc/UEX-API-English-1.0.3.pdf"
    ],
    upbit: [
        "Upbit",
        "https://upbit.com/.",
        "https://user-images.githubusercontent.com/1294454/49245610-eeaabe00-f423-11e8-9cba-4b0aed794799.jpg",
        "https://docs.upbit.com/docs/%EC%9A%94%EC%B2%AD-%EC%88%98-%EC%A0%9C%ED%95%9C"
    ],
    urdubit: [
        "UrduBit",
        "https://urdubit.com/.",
        "https://user-images.githubusercontent.com/1294454/27991453-156bf3ae-6480-11e7-82eb-7295fe1b5bb4.jpg",
        "https://blinktrade.com/docs"
    ],
    vaultoro: [
        "Vaultoro",
        "https://www.vaultoro.com/.",
        "https://user-images.githubusercontent.com/1294454/27766880-f205e870-5ee9-11e7-8fe2-0d5b15880752.jpg",
        "https://api.vaultoro.com/."
    ],
    vbtc: [
        "VBTC",
        "https://vbtc.exchange/.",
        "https://user-images.githubusercontent.com/1294454/27991481-1f53d1d8-6481-11e7-884e-21d17e7939db.jpg",
        "https://blinktrade.com/docs"
    ],
    virwox: [
        "VirWoX",
        "https://www.virwox.com/.",
        "https://user-images.githubusercontent.com/1294454/27766894-6da9d360-5eea-11e7-90aa-41f2711b7405.jpg",
        "https://www.virwox.com/developers.php"
    ],
    xbtce: [
        "xBTCe",
        "https://www.xbtce.com/.",
        "https://user-images.githubusercontent.com/1294454/28059414-e235970c-662c-11e7-8c3a-08e31f78684b.jpg",
        "https://www.xbtce.com/tradeapi"
    ],
    yobit: [
        "YoBit",
        "https://www.yobit.net/.",
        "https://user-images.githubusercontent.com/1294454/27766910-cdcbfdae-5eea-11e7-9859-03fea873272d.jpg",
        "https://www.yobit.net/en/api"
    ],
    zaif: [
        "Zaif",
        "https://zaif.jp/.",
        "https://user-images.githubusercontent.com/1294454/27766927-39ca2ada-5eeb-11e7-972f-1b4199518ca6.jpg",
        "https://techbureau-api-document.readthedocs.io/ja/latest/index.html"
    ],
    zb: [
        "ZB",
        "https://vip.zb.com/user/register?recommendCode=bn070u",
        "https://user-images.githubusercontent.com/1294454/32859187-cd5214f0-ca5e-11e7-967d-96568e2e2bd1.jpg",
        "https://www.zb.com/i/developer"
    ]
};
// in most cases payload (refered to as params in ccxt docs is not required)
// for some exchanges this parameter maybe needed but is usually optional
// consult with exchange docs
const allunifiedAPIs = {
    fetchMarkets: [],
    // this is actually an optional parameter but I made it here required.
    //Currently i am not having any special handling for required vs optional. will be in the next release
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
    createMarketOrder: [
        "private",
        "symbol",
        "orderside",
        "amount",
        ["apipayload"]
    ],
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
    createLimitBuyOrder: [
        "private",
        "symbol",
        "amount",
        "orderprice",
        ["apipayload"]
    ],
    createLimitSellOrder: [
        "private",
        "symbol",
        "amount",
        "orderprice",
        ["apipayload"]
    ],
    fetchOrder: ["private", "orderid", ["symbol", "apipayload"]],
    fetchOrderStatus: ["private", "orderid", ["symbol", "apipayload"]],
    fetchOrders: ["private", ["symbol", "since", "limit", "apipayload"]],
    fetchOpenOrders: [
        "private",
        ["symbol", "since", "limit", "apipayload"]
    ],
    fetchOpenOrder: ["private", "orderid", ["symbol", "apipayload"]],
    fetchClosedOrders: [
        "private",
        ["symbol", "since", "limit", "apipayload"]
    ],
    fetchOrderTrades: [
        "private",
        "orderid",
        ["symbol", "since", "limit", "apipayload"]
    ],
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
    fetchTransactions: [
        "private",
        "code",
        ["since", "limit", "apipayload"]
    ],
    fetchWithdrawals: [
        "private",
        "code",
        ["since", "limit", "apipayload"]
    ],
    withdraw: [
        "private",
        "code",
        "amount",
        "address",
        ["tag", "apipayload"]
    ],
    deposit: [
        "private",
        "code",
        "amount",
        "address",
        ["tag", "apipayload"]
    ],
    fetchLedger: ["private", "code", ["since", "limit", "apipayload"]],
    fetchLedgerEntry: ["private", "orderid", ["code", "apipayload"]],
    fetchBidsAsks: ["private", "symbol", ["apipayload"]],
    fetchFundingFees: ["private", "symbol", ["apipayload"]],
    fetchFundingFee: ["private", "code", ["apipayload"]],
    fetchTradingFees: ["private", "apipayload"],
    fetchTradingFee: ["private", "symbol", ["apipayload"]],
    fetchFees: ["private", "apipayload"],
    fetchTradingLimits: ["private", "symbol", ["apipayload"]],
    futures: [["apipayload"]] // I dont know how to use futures .. some exchanges have this capabilitylike OKEx
};

//-----------------------------------------------------------------------------

module.exports = Object.assign(
    { exchanges: exchanges, allunfiedAPIs: allunifiedAPIs },
    exchanges,
    allunifiedAPIs
);

//-----------------------------------------------------------------------------
