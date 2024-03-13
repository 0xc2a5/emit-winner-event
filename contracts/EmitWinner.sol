// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract EmitWinner {
    event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}
