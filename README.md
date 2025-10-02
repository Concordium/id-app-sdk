# Concordium IDApp SDK 

[![Release](https://github.com/Concordium/id-app-sdk/actions/workflows/deploy-sdk.yml/badge.svg)](https://github.com/Concordium/id-app-sdk/actions/workflows/deploy-sdk.yml)
[![Build](https://github.com/Concordium/id-app-sdk/actions/workflows/build-sdk.yml/badge.svg)](https://github.com/Concordium/id-app-sdk/actions/workflows/build-sdk.yml)
[![npm version](https://img.shields.io/npm/v/@concordium/id-app-sdk.svg)](https://www.npmjs.com/package/@concordium/id-app-sdk)


**Concordium IDApp SDK** — a TypeScript based SDK built for wallet providers who want to easily bring Concordium blockchain and identity features into their apps. With simple, intuitive APIs, this SDK makes integration fast, smooth, and hassle-free — so your wallet can go Concordium-ready in no time.

Concordium's design tightly [couples accounts and identities](https://docs.concordium.com/en/mainnet/docs/protocol/manage-accounts.html). To reduce complexity for wallet developers, identity-related processes can be offloaded to the Concordium IDApp, allowing third-party wallets to focus on signing and managing crypto transactions.


## ✨ Key Features

- **Create Account**: Allow users to set up new Concordium account via the IDApp.
- **Recover Account**: Enable users to restore their Concordium account easily.

## 📦 Installation

The SDK is published as a TypeScript package via NPM.

```bash
yarn add @concordium/id-app-sdk
# or
npm install @concordium/id-app-sdk
```

🚀 Usage

```ts
import {
  ConcordiumIDAppSDK,
  type CreateAccountCreationRequestMessage,
  IDAppSdkWallectConnectMethods,
  type CreateAccountCreationResponse,
  type CreateAccountResponseMsgType,
  type SignedCredentialDeploymentTransaction,
  type RecoverAccountCreationRequestMessage,
  type RecoverAccountResponse,
  type RecoverAccountMsgType,
} from "@concordium/id-app-sdk";
```

> 📘 See the [Concordium IDApp SDK v0.4 Integration Guide](/docs/IdApp-SDK-Integration-Guide-v1.1.pdf) for detailed integration instructions.


## 🛠 Development

**Build**
```bash
yarn build
```

**Type Check**
```bash
yarn typecheck
```

**Lint**
```bash
yarn lint
# or fix automatically
yarn lint:fix
```

**Prettifier**

```bash
yarn format
```

## 📦 Release

This package uses alpha and stable tags for versioning:

- Pre-releases (e.g. `0.1.0-alpha.2`) → published with `alpha` tag.
- Stable releases (e.g. `0.1.0`) → published with `latest` tag.

When releasing a new version of the SDK:
1. Ensure code passes checks

```bash
yarn build:all
```
2. Update the version in [package.json](/package.json)

3. Update the [CHANGELOG.md](/CHANGELOG.md)

Document notable changes since the last release.

4. Push the Git tag

```bash
# prerelease (e.g releases/sdk/0.1.0-alpha.2)
git tag releases/*/*.*.*-*  

# stable release (e.g releases/sdk/0.1.0)
git tag releases/*/*.*.*  

# push the tag
git push origin main --tags
```

- Pushing the tag will automatically:
    - Publish the package to NPM with the correct tag (alpha or latest).
    - Create a new release on GitHub.

5. Update Release Description
    - Go to the GitHub [Releases page](https://github.com/Concordium/id-app-sdk/releases)
    - Add release notes (can be adapted from CHANGELOG.md).
