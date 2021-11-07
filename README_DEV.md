# Truffle Development Cycle

* `compile`, `test` and `migrate`
* Note: 3 type of local network
  - Ganache GUI application: 127.0.0.1:7545
  - Ganache CLI `development`: 127.0.0.1:8545
  - Truffle all-in-one `develop`: 127.0.0.1:9545
* https://www.trufflesuite.com/docs/truffle/quickstart

## Using default `develop` local network

```bash
truffle compile
# this should output ./build/contracts

# run all tests
truffle test

# run specific test
truffle test --grep "should be able to create a new zombie"

# run specific test with verbose output for debug
truffle test --grep "attack another zombie" --stacktrace
# warning: "--stacktrace" will change result.receipt.status from true to 1

# make sure ./migrations/2_crypto_zombies.js is good

truffle develop
# Truffle Develop started at http://127.0.0.1:9545/

truffle(develop)> compile
truffle(develop)> test
truffle(develop)> migrate
```

## Alternatively using ganache `development` local network

* uncomment `networks.development` in `truffle-config.js`

```bash
ganache-cli
# Listening on 127.0.0.1:8545
# or start Ganache GUI on 127.0.0.1:7545

truffle compile
truffle test
truffle migrate

truffle console
truffle(development)>

# start over migrate
truffle migrate --reset
```

## Deploy to Testnet or Mainnet

* using Rinkeby: a public test network created by The Ethereum Foundation
* prepare infura token
* save mnemonic as `.secret`
  - mnemonic is 12 words saved when wallet created in MetaMask
* see https://github.com/trufflesuite/truffle/tree/master/packages/hdwallet-provider#truffle-usage
* edit `truffle-config.js`
* get some test Ether from rinkeby faucet

```bash
truffle migrate --network rinkeby
```

```bash
truffle migrate --network mainnet
```
