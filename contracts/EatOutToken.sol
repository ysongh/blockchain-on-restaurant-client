// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/compound.sol";

contract EatOutToken is ERC20{
    CEth public cToken;

    constructor(address _cToken) ERC20("Eat Out Coin", "EOTC") {
        cToken = CEth(_cToken);
    }

    // for redeem() to work
    receive() external payable {}

    function supply() external payable {
        cToken.mint{value: msg.value}();
        _mint(msg.sender, msg.value * 100);
    }

    function getExchangeAndSupplyRateInfo() external returns (uint exchangeRate, uint supplyRate) {
        exchangeRate = cToken.exchangeRateCurrent();
        supplyRate = cToken.supplyRatePerBlock();
    }


    function getCTokenBalance() external view returns (uint) {
        return cToken.balanceOf(address(this));
    }

    function redeem(uint _cTokenAmount) external {
        require(cToken.redeem(_cTokenAmount) == 0, "redeem failed");
    }
}