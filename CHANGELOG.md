# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.1] - 2025-08-28
### Added
- Implemented functionality for signCredentialTransaction and submitCCDTransaction
- Implemented functionality for invoking deep link popup and actions popups  
- Added readme and integration guideline document v0.4 
- Features: Create account, Recover account
---

## [0.1.2] - 2025-08-29
### Fixed
- Fixed missing `dist/` directory in published npm package by updating `.npmignore`/`files` configuration. 

---
## [0.1.3] - 2025-09-11
### Added
- Implemented `chainId` based on CAIP-2 specification for mainnet and testnet both

---
## [0.1.4] - 2025-09-23
### Added
- Attached integration guide v1.1 

---
## [0.1.5] - 2025-12-05
### Added
- Implemented `getKeyAccounts()` method to resolve a public key to wallet address(s)

### Fixed
- Removed all old recovery code and UI elements
