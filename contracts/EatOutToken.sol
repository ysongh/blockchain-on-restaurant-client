// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EatOutToken is ERC20{
    constructor() ERC20("Eat Out Coin", "EOTC") {
        // 5,000,000 EatOutTokens
        _mint(msg.sender, 5000000000000000000000000);
    }
}