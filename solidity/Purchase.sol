// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

// 安全的远程购买
contract Purchase {
    uint public value;
    address payable public seller;
    address payable public buyer;

    enum State { Created, Locked, Release, Inactive }
    // 状态变量的默认值是第一个成员 State.Created
    State public state;

    modifier condition(bool condition_) {
        require(condition_);
        _;
    }

    /// 只有买方可以调用这个函数
    error OnlyBuyer();
    /// 只有卖方可以调用这个函数
    error OnlySeller();
    /// 在当前状态下不能调用该函数
    error InvalidState();
    /// 提供的值必须是偶数
    error ValueNotEven();

    modifier onlyBuyer() {
        if (msg.sender != buyer) revert OnlyBuyer();
        _;
    }

    modifier onlySeller() {
        if (msg.sender != seller) revert OnlySeller();
        _;
    }

    modifier inState(State state_) {
        if (state != state_) revert InvalidState();
        _;
    }

    event Aborted();
    event PurchaseConfirmed();
    event ItemReceived();
    event SellerRefunded();

    // 确保 msg.value 是一个偶数
    // 如果是奇数，除法会截断。
    // 通过乘法检查它不是一个奇数
    constructor() payable {
        seller = payable(msg.sender)
        value = msg.value / 2;
        if ((2 * value) != msg.value) revert ValueNotEven();
    }

    /// 终止购买并收回以太币
    /// 只能由卖方在合约被锁定前调用
    function abort() external onlySeller inState(State.Created) {
        emit Aborted();
        state = State.Inactive;
        // 我们在这里直接使用 transfer
        // 它可以安全地重入
        // 因为它是这个函数中的最后一次调用
        // 而且我们已经改变了状态
        seller.transfer(address(this).balance);
    }

    // TODO

}