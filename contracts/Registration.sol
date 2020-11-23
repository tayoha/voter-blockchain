// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

contract Registration {
    bool public valid;
    string public name;
    string public DOB;
    string public addr;
    string public party;
    string public transaction_type;
    uint public timestamp;
    string public hashed_ident;
    string public ident_type;
}