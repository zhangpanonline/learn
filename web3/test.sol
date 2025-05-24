// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// 变量类型
// contract ValueTypes {
//     int public minInt = type(int).min;
//     uint public maxUInt = type(uint).max;
//     int public maxInt = type(int).max;
// }


// 状态变量：放在合约内部，函数外部
// 局部变量：函数内部的变量为局部变量
// contract StateVariables {

// }

// 全局变量
// contract GlobalVariables {
//     function globalVars() external view returns(address, uint, uint) {
//         address sender = msg.sender;
//         uint timestamp = block.timestamp;
//         uint blockNum = block.number;
//         return (sender, timestamp, blockNum);
//     }
// }

// view 可以读取区块链上的数据，不可写入
// pure 不可以读取也不可写入区块链上的数据
// contract ViewAndPureFunctions {
//     uint public num;

//     function viewFunc() external view returns(uint) {
//         return num;
//     }

//     function pureFunc() external pure returns(uint) {
//         return 1;
//     }

//     function addToNum(uint x) external view returns(uint) {
//         return num + x;
//     }

//     function add(uint x, uint y) external pure returns (uint) {
//         return x + y;
//     }
// }

// 默认值
// contract defaultValues {
//     bool public defaultBool; // false
//     uint public defaultUint; // 0
//     int public defaultInt; // 0
//     address public defaultAddress; // 0x0000000000000000000000000000000000000000
//     bytes32 public defaultBytes32; // 0x0000000000000000000000000000000000000000000000000000000000000000
//     // mapping structs enums fixed sized arrays
// }

// 常量：可以节省手续费
// contract Constants {
//     address public constant MY_ADDRESS = 0x0000000000000000000000000000000000000000; // execution cost	350 gas
//     address public my_address = 0x0000000000000000000000000000000000000000; // execution cost	2505 gas
// }

// ifElse
// contract IfElse {
//     function eg1(uint x) external pure returns(bool) {
//         if (x < 10) {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     function eg2(uint y) external pure returns(bool) {
//         return y < 10 ? true : false;
//     }
// }

// 循环
// contract Loop {
//     function loop(uint x) external pure returns(uint) {
//         uint s;
//         for(uint i = 1; i <= x; i++) {
//             s += i;
//         }
//         return s;
//     }
// }

/**
* 错误：有三种抛出方式，并且gas消费剩余值会返回，状态变量也会修改回之前状态
*       require：最常用情景是验证输入是否满足要求或者做一些权限的控制，去控制谁可以调用我们的函数，抛出错误
*       revert：检查入参
*       assert：确保入参为真
*       自定义错误：错误信息越长，越消耗gas，所以可以自定以错误，来节省gas
*/
// contract Error {
//     function useRequire(uint x) external pure {
//         // 如果大于10会报错
//         require(x <= 10, "i > 10");
//     }

//     function useRevert(uint x) external pure {
//         if (x > 10) {
//             revert("i > 10");
//         }
//     }

//     function useAssert(uint x) external pure {
//         assert(x <= 10);
//     }

//     error MyError(address, uint);
//     function useCustomError(uint x) public view {
//         if (x > 10) {
//             revert MyError(msg.sender, x);
//         }
//     }
// }

/**
* 函数装饰器
* Function modifier —— 代码重用
* Basic inputs sandwhich
*/
contract FnModifier {
    bool public paused;
    uint public count;

}