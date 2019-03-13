# Universal Authenticator Library (UAL Core for short)

## Why UAL?
App Developers need to support many authentication providers (wallets) in order to maximize user reach and permit user choice. Today, this usually means implementing and maintaining many different APIs. The purpose of this library is to simplify, for App Developers, supporting multiple authentication providers.

The Universal Authenticator Library (UAL) achieves this goal by abstracting the internal business logic of many authentication providers and exposing a single universal API.

This lets App Developers integrate once, and support all authentication providers that implement an Authenticator for UAL.

UAL also provides a renderer concept. Renderers are used so that the login experience on every site using UAL is the same. This gives End Users the benefit of a consistent and familiar interface. By utilizing the `getStyles()` method on the Authenticators, the Authenticator button will be rendered the same on any website.

### In Summary

For integrating app developers:
* a simple way to support multiple key managers, with a few lines of code
* increases an application’s market reach, by supporting multiple authenticators
* reduces time to create applications, by eliminating the need to individually support authenticators
* access to all the necessary functions to sign transactions and customize user experience

For app users:
* a way to login to integrating apps using the authenticator of choice
* a uniform, familiar login option that instills confidence while interacting with integrating apps


![UAL Image](.images/ual-login.png)

## Architecture
UAL Core - Provides abstract classes/interfaces to provide consistent Public APIs for integrating developers. Also provides some minor convenience functions.

Authenticators - Communicates with the signing app/device. An Authenticator provides login/logout functionality that returns a User object. The User object allows the integrating app to request a signature through the signing app/device.

Renderers - Provides a UI layer for giving users a consistent UI/UX flow, independent of the Authenticator they are using or the site they are on.

![UAL architecture](.images/ual-flow.png)

## Usage (Authenticator Developer)

A developer that wishes to add support for their authenticator to UAL must implement 2 classes. An `Authenticator` and a `User`.

The `Authenticator` class represents the Button that will (potentially) be rendered on the screen and the business logic around logging.

Logging in returns 1 or more `User` objects. A `User` object provides the ability for a Dapp developer to request the Dapp User to sign a transaction using whichever authentication provider they selected when logging in.

## Usage (Dapp Developer)

Requires one or more Authenticators to communicate with the auth provider. Currently supported authenticators include:
 - [Scatter](https://github.com/EOSIO/ual-scatter)
 - [Lynx](https://github.com/EOSIO/ual-lynx)
 - [Ledger](https://github.com/EOSIO/ual-ledger)

Recommended to use one of the prebuilt Renderers rather than the library directly:
 - [UAL JS](https://github.com/EOSIO/universal-authenticator-library-plain-js-renderer)
 - [UAL React](https://github.com/EOSIO/universal-authenticator-library-react-js-renderer)

Example usage can be found at:
 - [UAL JS Example](https://github.com/EOSIO/universal-authenticator-library-plain-js-renderer/tree/develop/examples)
 - [UAL React Example](https://github.com/EOSIO/universal-authenticator-library-react-js-renderer/tree/develop/examples)

## Contributing

[Contributing Guide](https://github.com/EOSIO/universal-authenticator-library/blob/develop/CONTRIBUTING.md)

[Code of Conduct](https://github.com/EOSIO/universal-authenticator-library/blob/develop/CONTRIBUTING.md#conduct)

## License

[MIT](https://github.com/EOSIO/universal-authenticator-library/blob/develop/LICENSE)

