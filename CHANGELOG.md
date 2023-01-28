## 0.3.0.1

Beta release for the new version to support the goals of the new project.

## 0.2.3.2

### Fixes

- Repaired API endpoints to respond on initial load and to have 'v2' separation from original codebase if they're installed side-by-side
- Allowed for deeper Custom API structures (e.g. Bybit)
- Reversed release order of this file (CHANGELOG.md) for easier reading

## 0.2.3.1

Forked due to inactivity with upstream project.

### Fixes

- ACX: corrected and removed APIs list from ccxt package. upstream ccxt need to be updated.
- Fixed a bug where the call fails if the custom API includes a path parameter such as:

  ```
  /path/{market}
  /path/{coin}/balance
  ```

## 0.2.3

### Fixes

Some Exchanges not support pass API parameters like string so I will send these parameters like JSON object always. In bittrex for example only support JSON parameters and Kraken not. But always support JSON parameters.

## 0.2.2: First Release

### Enhancements

Now this node package supports the API for all **(133 exchanges) crypto exchanges** APIs in the world.

## 0.2.3: Bug Fix

Fixes issue #5 - for custom API an underscore is needlessly added at the end of the API method causing the API to fail.

## 0.2.4: Bug Fix

Fixes issue #6 - Exchange list values are not populated correctly in API config page.

## 0.2.5: support for additional input types

Added support for additional input types for the following fields:

filtermarkets (msg, flow, json, jsonata)
amount (msg, flow)
orderprice (msg, flow)
apipayload (jsonata)

## 0.2.6: BREAKING CHANGE support Sandbox mode

exchange configuration `url` field is removed, and now the ability to choose a `testnet` environment is supported by a new checkbox field.
Sandbox Mode checkbox field is added to support connecting to an alternate `sandbox` or `testnet` environment as supported by the exchange.
if the exchange includes different `testnet` environment, sandbox mode is possible.
This means the API will not hit the `livenet` if Sandbox mode is supported. Usually a user will have a different API Keys for the `testnet` environment.
If the Sandbox Mode checkbox is ticked and the exchange does NOT provide an alternate sandbox environment, the API call will fail and error is returned.

## 0.2.7: BUG FIX support transfer Unified API

fixes #7 no Unified APIs appear in the list when using Kucoin exchange.

## 0.2.8: BUG FIX enable support for any Unified API

Previously `exchanges.js` file must have an entry for every Unified API. This was done so that the interface shows the fields needed for the API.
The issue is that with every new `ccxt` version, numerous new Unified APIs are introduced, specific to some exchanges.
This version now checks if the specific Unified API exists on our configuration file `exchanges.js` to determine the fields to show, and if the
API does not exist , we dynamically add the API rather than yeild the exchange unusable. This way any new API should be possible to use.
The solution is not guranteed to work across all exchanges, given that those new Unified APIs might require different payloads. However, in theory,
you should be able to send any data to the new Unified API using the `Payload` field. We assume those new Unified APIs are private and require a `Payload`.

## 0.2.9: enhancement to use resources dir for images

using `resources` folder for images and icons.
Now the minimum Node-Red version is 1.3.0 for this to work.

## 0.2.10: Bug Fix: some exchanges do not have custom APIs correctly listed

workaround solution to correctly list the custom APIs for exchanges. This is to fix a bug where some exchanges have their custom APIs listed with unrecognised names or numbers.

## 0.2.11: Bug Fix: call on undefined object

jquery ensure that exchange symbol provided exists for the exchange prior to making the API call.

## 0.2.12:

### Added Feature : since parameter as Key/Value pair object

- `Since` parameter can now be a JSON object used with the `Market` parameter. This allows the node to have different startTime values for market symbols. This is very useful when you use multiple markets in the same call, which is recommended because it uses the internal rateLimiter. To use it select the new type `JSON` from the Typed Input field, or provide a valid JSON object in `msg` or `flow` .
  the JSON object should be a key/value pair where the key corrospends to a valid market symbol for example "BTC/AUD", "BTC/ETH", etc. and
  the value is the start Time in either 'yyyy-mm-dd hh:mm:ss' format , or an epoch milliseconds number.
  For example `{"BTC/AUD":1610021722138, "ETH/AUD": "2021-02-11", "BTC/USDT": "2020-06-30 15:30:00"}`
  if a date is provided it is internally converted to the milliseconds equivalent number.
  if a symbol which exists in the call but does not exist in the provided object it is ignored.

### Fix and additions to Unified APIs

- added a number of new Unified APIs : fetchFundingRate, fetchFundingRates,fetchFundingRateHistory,fetchFundingHistory
- Fixed some Unified APIs signature to be "private" rather than public.
- Tested with latest Node-RED version (v3.0.2) and NodeJS versions, (v14.20.0) , (v16.17.1)

## 0.2.13:

### Enhancment

- changed node `close` event listener to accept input argument `done` to signal completion to the runtime.
- various old comments cleanup
