# How to use Truffle Console

* interact with smart contract with truffle console
* first, start console with `truffle develop` or `truffle console`
* see also the unit test `test/CryptoZombies.js`

## Setup

```js
let alice = accounts[0]
let bob = accounts[1]
let cz = await CryptoZombies.deployed()

// check address
alice
'0x5Fe58A5365c2a8F6A261ee284B966183405B383C'
bob
'0xb0B49FD2Ce176A4d68Cf87e4872E498b2eDee2C9'
cz.address
'0x4704c9c30163E4DB8da4C091f11000A1DDd835cF'

// 4 ways to display BN with string or number
cz.balanceOf(alice).then(_ => _.toString())
'0'
cz.balanceOf(alice).then(_ => _.toNumber())
0
(await cz.balanceOf(alice)).toString()
'0'
(await cz.balanceOf(alice)).toNumber()
0

cz.ownerOf(0)
'0x0000000000000000000000000000000000000000'
```

## Create New Zombie

```js
let res = await cz.createRandomZombie('Foo')

res.receipt.from
'0x5fe58a5365c2a8f6a261ee284b966183405b383c' // alice
res.receipt.to
'0x4704c9c30163e4db8da4c091f11000a1ddd835cf' // cz

res.receipt.status
true
res.logs[0].args.name
'Foo'
res.logs[0].args.zombieId.toString()
'0'

// alternatively check new zombieId from events
let events = await cz.getPastEvents('NewZombie')
let zombieId = events[0].args.zombieId

// note it is same as res.logs[0].args.zombieId
zombieId.toString()
'0'

(await cz.balanceOf(alice)).toString()
'1'

// confirm the owner is alice
cz.ownerOf(zombieId)
'0x5Fe58A5365c2a8F6A261ee284B966183405B383C'
cz.zombieToOwner(zombieId)
'0x5Fe58A5365c2a8F6A261ee284B966183405B383C'

// check details of new zombie
let zombie = await cz.zombies(zombieId)

zombie.name
'Foo'
zombie.dna.toString()
'5979230618588800'
zombie.level.toString()
'1'
```

## Check Error

```js
// this will be RuntimeError
cz.createRandomZombie('Bar')
```

## Create 2nd Zombie

```js
let res2 = await cz.createRandomZombie('Bar', { from: bob })

res2.receipt.from
'0xb0b49fd2ce176a4d68cf87e4872e498b2edee2c9' // bob
res2.receipt.to
'0x4704c9c30163e4db8da4c091f11000a1ddd835cf' // cz

let zombieId2 = res2.logs[0].args.zombieId

zombieId2.toString()
'1'

(await cz.balanceOf(bob)).toString()
'1'

cz.ownerOf(zombieId2)
'0xb0B49FD2Ce176A4d68Cf87e4872E498b2eDee2C9' // bob
```

## Transfer Zombie from Alice to Bob

```js
let res3 = await cz.transferFrom(alice, bob, zombieId)

res.receipt.status
true

// confirm bob own both zombies
(await cz.balanceOf(alice)).toString()
'0'
(await cz.balanceOf(bob)).toString()
'2'

cz.ownerOf(zombieId)
'0xb0B49FD2Ce176A4d68Cf87e4872E498b2eDee2C9' // bob
cz.ownerOf(zombieId2)
'0xb0B49FD2Ce176A4d68Cf87e4872E498b2eDee2C9' // bob
```
