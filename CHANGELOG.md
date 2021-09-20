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

## 0.2.9: icons and images

using `resources` folder for images and icons.
Now the minimum Node-Red version is 1.3.0 for this to work.
