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
        it('set the total supply to 1000000', async() => {
            const totalSupply = await eatOutToken.totalSupply();
            assert.equal(totalSupply.toNumber(), 1000000);
        });
        it('give 1000000 tokens to the admin', async() => {
            const admin = await eatOutToken.balanceOf(deployer);
            assert.equal(admin.toNumber(), 1000000);
        });
    });

    describe('transfer token', async() => {
        it('receives the correct amount of tokens', async() => {
            const receipt = await eatOutToken.transfer(account1, 200, { from: deployer });

            const event = receipt.logs[0].args;
            assert.equal(event._from, deployer, 'the account the tokens are transferred from is correct');
            assert.equal(event._to, account1, 'the account the tokens are transferred to is correct');
            assert.equal(event._value, 200, 'the transfer amount is correct');

            const receiver = await eatOutToken.balanceOf(account1);
            assert.equal(receiver.toNumber(), 200);

            const sender = await eatOutToken.balanceOf(deployer);
            assert.equal(sender.toNumber(), 999800);

            // reject if there is not enough tokens for the sender to transfer
            await eatOutToken.transfer.call(account1, 2000000000, { from: deployer }).should.be.rejected;
        });
    });
})