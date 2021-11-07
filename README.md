# Solidity Truffle Dapp Notes and Updated CryptoZombies

* Solidity Truffle development key points summary
* Misc updates and fixes CryptoZombies with 2021 latest version
  - Solidity v0.8.9
  - Truffle v5.4.18
  - Web3.js v1.5.3
* reference dapp https://cryptozombies.io/

## Other Misc Notes

* [Truffle Solidity Dev Env Setup](README_SETUP.md)
* [Truffle Development Cycle](README_DEV.md)
* [How to use Truffle Console](README_CONSOLE.md)
* [Test Smart Contract with Truffle](README_TESTS.md)
* [Solidity Dapp Webapp with Web3.js](README_WEB.md)

## Solidity Key Points

### data location

* `memory` (temporary reference function parameter)
* `storage` (state variable stored on blockchain)
* `calldata` (external function's dynamic parameters)

### function modifiers

* visibility modifiers
  - `private` (only callable from other functions inside the contract)
  - `internal` (like private but also be called by child contracts)
  - `external` (can only be called outside the contract)
  - `public` (can be called anywhere)
* state modifiers (GAS free when called externally)
  - `view` (no data will be saved/changed)
  - `pure` (view + doesn't read any data from the blockchain)
* custom modifiers
* `payable` (special type of function that can receive Ether)

```javascript
function sample(uint i, string memory s, Zombie storage _zombie)
    external view onlyOwner anotherModifier {
  /* ... */
  Zombie storage myZombie = xx;
}
```

### Payable sample

```javascript
contract OnlineStore {
  function buySomething() external payable {
    // Check to make sure 0.001 ether was sent to the function call:
    require(msg.value == 0.001 ether);
    // If so, some logic to transfer the digital item to the caller of the function:
    transferThing(msg.sender);
  }
}
```

## Two ways to transfer ERC721 token

### transferFrom()

* `transferFrom(address _from, address _to, uint256 _tokenId)`
  - token's owner call this to transfer `_tokenId` from `_from` (= owner) to `_to`

### approve() & transferFrom()

Delegate function: Approved receiver (or contract) can transfer owner's token.

* `approve(address _approved, uint256 _tokenId)`
  - owner call this so that `_approved` can transfer `_tokenId`
* `transferFrom(address _from, address _to, uint256 _tokenId)`
  - `_approved` call this to transfer `_tokenId` from `_from` (= owner) to `_to`

c.f. https://cryptozombies.io/en/lesson/5/chapter/5

## OpenZeppelin SafeMath

* Protect overflows

```js
using SafeMath for uint256;
// instead of x++ to prevent overflow;
x = x.add(1);
```

## Web3 App

### call VS send

```js
var myContract = new web3js.eth.Contract(myABI, myContractAddress);

// runs on the local node for view and pure functions
// don't cost any gas (read-only)
// user won't be prompted to sign a transaction with MetaMask
myContract.methods.myMethod(123).call();

// create a transaction and change data on the blockchain
// user need to pay gas
// Metamask prompt user to sign a transaction
myContract.methods.myMethod(123).send()

// helper function example
function myMethod(param) {
  return myContract.methods.myMethod(param).call();
}
```

### Web3 idioms

```js
// find web3 object at startup
window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
  } else {
    // Handle the case where the user doesn't have Metamask installed
    // Probably show them a message prompting them to install Metamask
  }

  // Now you can start your app & access web3 freely:
  startApp()

})
```

```js
// keep checking account and update if it is switched
var accountInterval = setInterval(function() {
  // Check if account has changed
  if (web3.eth.accounts[0] !== userAccount) {
    userAccount = web3.eth.accounts[0];
    // Call a function to update the UI with the new account
    getZombiesByOwner(userAccount)
    .then(displayZombies);
  }
}, 100);
```

### interesting use case of Event

* Using events as a cheaper form of storage (in terms of gas)
* For example, we could use this as a historical record of zombie battles
