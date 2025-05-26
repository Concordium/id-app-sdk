# Concordium ID App SDK 

This SDK is intended for 3P developer who wants to integrate Concordium IDApp in their wallet / app.

## Installation 

Currently the package is private repo and have not been pushed to NPM registery. So we will install via Github. 

In your package.json add the following dependency

```json
"id-app-sdk": "git+https://github.com/Concordium/id-app-sdk.git#develop"
```

Since the repo is private, please add `.npmrc` file as well with the following 

```
//npm.pkg.github.com/:_authToken=<Your Personal Access Token>
```

Finally do, `yarn` or `npm  i`









