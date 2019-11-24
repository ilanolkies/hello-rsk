pragma solidity ^0.5.0;

contract HelloRSK {
  string private greeting = "Set me :D";

  function getGreeting () external view returns (string memory) {
    return greeting;
  }

  function setGreeting (string calldata newGreeting) external {
    greeting = newGreeting;
  }
}
