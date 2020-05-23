var Patient = artifacts.require("./Patient.sol");

module.exports = function(deployer) {
  deployer.deploy(Patient);
};
