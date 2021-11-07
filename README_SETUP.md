# Truffle Solidity Development Environment Setup

* setup Truffle Solidity using Mac and Homebrew

## Node.js

```bash
# check outdated packages
brew update && brew outdated && brew outdated --cask
# upgrade packages
brew update && brew upgrade && brew upgrade --cask

# https://github.com/nodenv/nodenv
nodenv install -l | less
nodenv install 16.13.0
nodenv global 16.13.0

# check node version
nodenv versions
node --version
# v16.13.0

# you may need to upgrade npm
npm outdated -g
npm install -g npm
npm --version
# 8.1.3

# list installed packages
npm ls -g --depth=0

# https://github.com/nodenv/nodenv#nodenv-rehash
# automatically runs nodenv rehash whenever npm package -g some_package
git clone https://github.com/nodenv/nodenv-package-rehash.git \
    "$(nodenv root)"/plugins/nodenv-package-rehash
```

## Truffle and Ganache

* __Truffle__: development framework (includes `develop` network)
  - `truffle develop` is all-in-one personal network and console
* __Ganache__: local Ethereum network (includes `development` network)
  - alternative local network by `ganache-cli` or Ganache GUI app
  - need to uncomment `networks.development` in `truffle-config.js`

```bash
npm install -g truffle
truffle version
# Truffle v5.4.18 (core: 5.4.18)
# Solidity v0.5.16 (solc-js)
# Node v16.13.0
# Web3.js v1.5.3

npm install -g ganache-cli
ganache-cli --version
# Ganache CLI v6.12.2 (ganache-core: 2.13.2)
```

## Truffle Project

```bash
truffle init
```

* make sure the latest `compilers.solc.version = "0.8.9"` in `truffle-config.js`
* just fyi, openzeppelin contracts 4.x require solidity compiler 0.8.x
* https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.0.0

```bash
# no need to run npm install -g solc to use specific solc version

# check solc version
truffle version
# Truffle v5.4.15 (core: 5.4.15)
# Solidity - 0.8.9 (solc-js)
# Node v16.13.0
# Web3.js v1.5.3
```

* install npm packages for truffle project

```bash
# for npm scripts setup but you can skip this
# npm init --yes

# for test assertion
npm install chai

# to use Infura
npm install @truffle/hdwallet-provider
# NOTE truffle-hdwallet-provider is deprecated

# npm install @openzeppelin/contracts
```
