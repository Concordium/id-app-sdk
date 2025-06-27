# Concordium IDApp SDK 

Concordium IDApp SDK is a TypeScript-based library designed for wallet providers who want to seamlessly integrate Concordium blockchain and identity features into their applications. With simple and intuitive APIs, this SDK allows fast, hassle-free integration — enabling your wallet to be Concordium-ready in no time.

Concordium's design tightly [couples accounts and identities](https://docs.concordium.com/en/mainnet/docs/protocol/manage-accounts.html). To reduce complexity for wallet developers, identity-related processes can be offloaded to the Concordium IDApp, allowing third-party wallets to focus on signing and managing crypto transactions.


## ✨ Key Features

- **Create Account**: Allow users to set up new Concordium accounts via the IDApp.
- **Recover Account**: Enable users to restore their Concordium account easily.

📘 Refer to the [Concordium IDApp SDK v0.3 Integration Guide](https://concordium.atlassian.net/wiki/x/IoB8b) for detailed integration instructions.


## 📦 Installation

The SDK is currently hosted in a private GitHub repository and is not yet available on the NPM registry.

### Step 1: Add to `package.json`

```json
"id-app-sdk": "git+https://github.com/Concordium/id-app-sdk.git#develop"
```
### Step 2: Configure `.npmrc`

Since the repository is private, you’ll need to authenticate with a GitHub personal access token (PAT):

```
//npm.pkg.github.com/:_authToken=<YOUR_PERSONAL_ACCESS_TOKEN>
```
> 💡 Ensure that your PAT has appropriate repo and read:packages permissions.

### Step 3: Install Dependencies

```
npm install
# or
yarn install
```
