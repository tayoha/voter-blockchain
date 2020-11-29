// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

contract Registration {
  uint public voterCount = 0;

  struct Voter {
    bool valid;
    string name;
    string DOB;
    //string addr;
    //string party;
    string transaction_type;
    //uint timestamp;
    string hashed_ident;
    string ident_type;
  }

  mapping(uint => Voter) public voters;

  function createVoter(bool _valid, string memory _name, string memory _DOB, /*string memory _addr, string memory _party, */
  string memory _transaction_type, /*uint _timestamp, */string memory _hashed_ident, string memory _ident_type) public {
    voterCount ++;
    voters[voterCount] = Voter(_valid, _name, _DOB, /*_addr, _party, */_transaction_type, /*_timestamp, */_hashed_ident, _ident_type);
  }
}
