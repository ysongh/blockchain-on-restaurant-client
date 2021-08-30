  // SPDX-License-Identifier: MIT
pragma solidity ^0.8;

interface CEth {
    function balanceOf(address) external view returns (uint);

    function mint() external payable;

    function exchangeRateCurrent() external returns (uint);

    function supplyRatePerBlock() external returns (uint);

    function balanceOfUnderlying(address) external returns (uint);

    function redeem(uint) external returns (uint);

    function redeemUnderlying(uint) external returns (uint);

    function borrow(uint) external returns (uint);

    function borrowBalanceCurrent(address) external returns (uint);

    function borrowRatePerBlock() external view returns (uint);

    function repayBorrow() external payable;
}