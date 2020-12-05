const { assert } = require('chai');

require('chai')
    .use(require('chai-as-promised'))
    .should();

const EatOutToken = artifacts.require('./EatOutToken.sol');

contract(EatOutToken, ([deployer, account1]) => {
    let eatOutToken;

    before(async() => {
        eatOutToken = await EatOutToken.deployed();
    });

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = await eatOutToken.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });
        it('set the total supply to 5,000,000', async() => {
            const totalSupply = await eatOutToken.totalSupply();
            assert.equal(totalSupply.toString(), web3.utils.toWei('5000000', 'ether'));
        });
        it('give 5,000,000 tokens to the admin', async() => {
            const admin = await eatOutToken.balanceOf(deployer);
            assert.equal(admin.toString(), web3.utils.toWei('5000000', 'ether'));
        });
    });
})