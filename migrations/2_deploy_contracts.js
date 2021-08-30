const EatOutToken = artifacts.require("EatOutToken");

module.exports = async function(deployer){
  // cETH = 0xd6801a1dffcd0a410336ef88def4320d6df1883e (Rinkeby)
  await deployer.deploy(EatOutToken, "0xd6801a1dffcd0a410336ef88def4320d6df1883e");
};