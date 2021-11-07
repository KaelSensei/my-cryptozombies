// note
// the original code is modified based on Time Travelling Truffle Tests
// https://medium.com/edgefund/time-travelling-truffle-tests-f581c1964687

// see also
// https://github.com/trufflesuite/truffle/issues/2653
// https://stackoverflow.com/questions/42453683/how-to-reject-in-async-await-syntax

async function increase(duration_) {

  // first, let's increase time
  await web3.currentProvider.send({
    jsonrpc: "2.0",
    method: "evm_increaseTime",
    params: [duration_], // there are 86400 seconds in a day
    id: new Date().getTime()
  }, (err, res) => {
    return err ? Promise.reject(err) : Promise.resolve(res);
  });

  // next, let's mine a new block
  await web3.currentProvider.send({
    jsonrpc: '2.0',
    method: 'evm_mine',
    params: [],
    id: new Date().getTime()
  }, (err, res) => {
    return err ? Promise.reject(err) : Promise.resolve(res);
  })

}

const duration = {

  seconds: function (val) {
    return val;
  },
  minutes: function (val) {
    return val * this.seconds(60);
  },
  hours: function (val) {
    return val * this.minutes(60);
  },
  days: function (val) {
    return val * this.hours(24);
  },
}

module.exports = {
  increase,
  duration,
};
