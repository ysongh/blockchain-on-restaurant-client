pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

contract EatOutToken is ERC20Mintable{
    string  public name;
    string  public symbol;
    uint256 public decimals;
    address payable admin;

    constructor() public {
        name = "Eat Out Coin";
        symbol = "EOTC";
        decimals = 18;
        admin = msg.sender;
    }
}