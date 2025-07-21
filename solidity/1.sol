// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExampleContract {
    // 状态变量存储在 storage => stateDB
    uint256 public stateVar = 100;
    mapping(address => uint256) public balances;
    uint256[] someStorageArray;

    // 常量：编译时确定，在字节码中
    uint256 public constant CONSTANT_VAR = 1000;

    // immutable 部署时确定，在代码区
    uint256 public immutable IMMUTABLE_VAR;

    // 部署时调用
    constructor() {
        IMMUTABLE_VAR = 500;
    }

    struct TempStruct {}

    function claimVar() {}

    // 纯函数中的变量全部在栈上
    function pureFn(uint256 x) public pure return (uint256) {
        uint256 y = x * 2;
        return y
    }

    // sload 操作
    function viewFn() public view returns (uint256){
        return stateVar;
    }

    // 引用传递示例
    function referenceFn(uint256[] memory inputArray) public {
        uint256[] memory localArray = inputArray;

        // SSTORE 操作
        someStorageArray.push(100)
    }
}