var Patient = artifacts.require("../src/contracts/Patient.sol");

module.exports = function(deployer) {
  deployer.deploy(Patient);
};
