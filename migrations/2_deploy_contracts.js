const EatOutToken = artifacts.require("EatOutToken");

module.exports = async function(deployer){
  await deployer.deploy(EatOutToken);
};