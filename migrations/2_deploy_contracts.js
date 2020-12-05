const EatOutToken = artifacts.require("EatOutToken");

module.exports = async function(deployer){
  await deployer.deploy(EatOutToken);

  const token = await EatOutToken.deployed();

  // 5,000,000 EatOutTokens
  await token.mint('0xB301C4129B9AfCD339FE7a86C78172D8F3452566', web3.utils.toWei('5000000', 'ether'));
};