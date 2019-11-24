const HelloRSK = artifacts.require('HelloRSK');

module.exports = (deployer) => {
  return deployer.deploy(HelloRSK);
};
