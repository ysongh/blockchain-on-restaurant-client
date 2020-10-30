pragma solidity >=0.4.21 <0.7.0;

contract EatOutToken{
    string public name = 'Eat Out Coin';
    string public symbol = 'EOTC';

    uint256 public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}