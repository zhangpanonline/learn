* 什么是 evm ？
    JVM java virtuaul machine jvm字节码
    EVM ethreum virtuaul machine evm字节码
    solidity 强类型脚本语言 compiler => evm bytescode => evm

* 每次发生一次交互（交易），都发生了什么？
    区块链创建了一个 evm 实例，执行合约的字节码，对数据进行处理运算

EVM 的存储结构：
    Stack（栈）
        每个栈有1024个slot（槽位）,如果超出数量会报错“stack too depp"
        每个slot空间是 32字节，也就是256个比特位

    Memory
        evm 自身的内存

    Storage
        存储在链上永久的数据
    
数据的长度如果知道，并且不超过256个比特位的，就放在栈里；
如果长度不知道或超过256个比特位，放在Memroy或Storage。
基于这两点，可以对数据进行分类。

数据分类：
    基本类型
        长度固定，实际数据就在 Stack

        整数
            unit => 无符号整型，默认 uint256
            int => -+整型，默认 int256
        布尔
            bool
        地址
            address
        枚举
            enum
        字节
            bytes，最大32位，即 bytes32。

    引用类型
        长度未知或者超过32bit，实际数据在 Memory 或 Storage，Stack 里只有一个 keccack256 类型的哈希，指向 Memory 或 Storage 里存储的数据位置。

        数组
        字符串
        结构体
        映射


