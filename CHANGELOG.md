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
