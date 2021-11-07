# Test Smart Contract with Truffle (Mocha)

## Idioms

```js
const utils = require("./helpers/utils");
const utils = require("./helpers/time");
const myAwesomeContract = artifacts.require("myAwesomeContract");

contract("MyAwesomeContract", (accounts) => {
  let contractInstance;

  beforeEach(async () => {
    // setup
    contractInstance = await myAwesomeContract.new();
  });

  it("should be able to run someMethod", () => {
    // act
    const result = await contractInstance.someMethod(foo, {from: alice});

    // assert
    assert.equal(result.receipt.status, true);
    assert.equal(result.logs[0].args.bar, "bar");
  })

  it("should not allow myAwesomeFunction", () => {
    await utils.shouldThrow(contractInstance.myAwesomeFunction());
  })

  // time helper example
  // await time.increaseTime(time.duration.days(1));

  // start with x will be skipped
  xcontext("with the single-step transfer scenario", async () => {
    it("should transfer", async () => {
      // TODO
    })
  })

  // another way to skip test
  it.skip("with the two-step transfer scenario", async () => {
    it("should approve and approved address transfer", async () => {
      // TODO
    })
    it("should approve and owner transfer", async () => {
      // TODO
    })
  })

  afterEach(async () => {
   await contractInstance.kill();
  });
})
```

* result.logs[0].args.bar: output from event log
* result.tx: the transaction hash
* result.receipt: an object containing the transaction receipt.
  - If result.receipt.status is true transaction was successful.
  - Otherwise, the transaction failed.

## Chai Assertion Library

use Chai for readable assert

```js
var expect = require('chai').expect;
let lessonTitle = "Testing Smart Contracts";

expect(lessonTitle).to.be.a("string");
lessonTitle.should.be.a("string");
assert.typeOf(lessonTitle, "string");

expect(lessonTitle).to.equal('Testing Smart Contracts');
```
