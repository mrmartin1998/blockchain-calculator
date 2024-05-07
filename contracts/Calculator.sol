// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calculator {
 uint256 public result;
 
 function add(uint256 a, uint256 b) public {
 result = a + b;
 }
 
 function subtract(uint256 a, uint256 b) public {
 result = a - b;
 }
 
 modifier nonZero(uint256 number) {
 require(number != 0, "Number cannot be zero");
 _;
 }
 
 function divide(uint256 a, uint256 b) public nonZero(b) {
 result = a / b;
 }

 function multiply(uint256 a, uint b) public {
    result = a * b;
 }
}