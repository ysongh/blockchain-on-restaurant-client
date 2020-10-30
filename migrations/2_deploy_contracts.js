const EatOutToken = artifacts.require("EatOutToken");

module.exports = function(deployer){
  deployer.deploy(EatOutToken, 1000000);
};