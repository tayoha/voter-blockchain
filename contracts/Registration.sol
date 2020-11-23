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

    constructor(bool _valid, string memory _name,string memory _DOB,string memory _addr,
    string memory _party, string memory _transaction_type, uint _timestamp, string memory _hashed_ident,
    string memory _ident_type){

    }
}