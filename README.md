# Universal Authenticator Library (UAL Core for short)

![EOSIO Labs](https://img.shields.io/badge/EOSIO-Labs-5cb3ff.svg)

# About EOSIO Labs

EOSIO Labs repositories are experimental.  Developers in the community are encouraged to use EOSIO Labs repositories as the basis for code and concepts to incorporate into their applications. Community members are also welcome to contribute and further develop these repositories. Since these repositories are not supported by Block.one, we may not provide responses to issue reports, pull requests, updates to functionality, or other requests from the community, and we encourage the community to take responsibility for these.

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

The following is an example for a *desktop browser*.  Mobile wallets with built-in browsers are autodetected and will not prompt the user to select them.

<img src=".images/ual-login.png" alt="UAL Image" width="400">

*All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.*

## Architecture
UAL Core - Provides abstract classes/interfaces to provide consistent Public APIs for integrating developers. Also provides some minor convenience functions.

Authenticators - Communicates with the signing app/device. An Authenticator provides login/logout functionality that returns a User object. The User object allows the integrating app to request a signature through the signing app/device.

Renderers - Provides a UI layer for giving users a consistent UI/UX flow, independent of the Authenticator they are using or the site they are on.

<img src=".images/ual-flow.png" alt="UAL architecture" width="700">

## Usage (Authenticator Developer)

A developer that wishes to add support for their authenticator to UAL must implement 2 classes. An `Authenticator` and a `User`.

The `Authenticator` class represents the Button that will (potentially) be rendered on the screen and the business logic around logging.

Logging in returns 1 or more `User` objects. A `User` object provides the ability for a Dapp developer to request the Dapp User to sign a transaction using whichever authentication provider they selected when logging in.

## Usage (Dapp Developer)

Requires one or more Authenticators to communicate with the auth provider. Currently supported Authenticators include the following. See the [UAL New Authenticator Walkthrough](https://github.com/EOSIO/ual-authenticator-walkthrough) to learn how contributors could add new Authenticators.

Authenticators initially created by block.one:
 - [UAL for Scatter](https://github.com/EOSIO/ual-scatter)
 - [UAL for Lynx](https://github.com/EOSIO/ual-lynx)
 - [UAL for Ledger](https://github.com/EOSIO/ual-ledger)
 - [UAL for Token Pocket](https://github.com/EOSIO/ual-token-pocket)

Authenticators contributed by wallet providers and other community members:  
 - [UAL for MEET.ONE](https://github.com/meet-one/ual-meetone)
 - [UAL for Anchor](https://github.com/greymass/ual-anchor)

Recommended to use one of the prebuilt Renderers rather than the library directly:
 - [UAL Renderer for PlainJS](https://github.com/EOSIO/ual-plainjs-renderer)
 - [UAL Renderer for ReactJS](https://github.com/EOSIO/ual-reactjs-renderer)

Example usage can be found at:
 - [Basic Example App for UAL with PlainJS](https://github.com/EOSIO/ual-plainjs-renderer/tree/master/examples)
 - [Basic Example App for UAL with ReactJS](https://github.com/EOSIO/ual-reactjs-renderer/tree/master/examples)

## Contributing

[Contributing Guide](./CONTRIBUTING.md)

[Code of Conduct](./CONTRIBUTING.md#conduct)

## License

[MIT](./LICENSE)

## Important

See [LICENSE](./LICENSE) for copyright and license terms.

All repositories and other materials are provided subject to the terms of this [IMPORTANT](./IMPORTANT.md) notice and you must familiarize yourself with its terms.  The notice contains important information, limitations and restrictions relating to our software, publications, trademarks, third-party resources, and forward-looking statements.  By accessing any of our repositories and other materials, you accept and agree to the terms of the notice.
