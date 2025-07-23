// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

// 盲拍（秘密竞拍）
contract BlindAuction {
    struct Bid {
        bytes32 blindedBid;
        uint deposit;
    }

    address payable public beneficiary;
    uint public biddingEnd;
    uint public revealEnd;
    bool public ended;

    mapping(address => Bid[]) public bids;

    address public highestBidder;
    uint public highestBid;

    // 允许取回以前的竞标
    mapping(address => uint) pendingReturns;

    event AuctionEnded(address winner, uint highestBid);

    // 描述失败的错误信息

    /// 该函数被过早调用。
    /// 在 time 时间再试一次
    error TooEarly(uint time);

    /// 该函数被过晚调用
    /// 它不能在 time 时间之后被调用
    error TooLate(uint time);
    /// 函数 auctionEnd 已经被调用
    error AuctionEndAlreadyCalled();

    // 使用 修饰符modifier 可以更便捷的校验函数的入参
    // onlyBefore 会被用于后面的 bid 函数
    // 新的函数体是由 modifier 本身的函数体，其中 _ 被旧的函数体所取代
    modifier onlyBefore(uint time) {
        if (block.timestamp >= time) revert TooLate(time);
        _;
    }
    modifier onlyAfter(uint time) {
        if (block.timestamp <= time) revert TooEarly(time);
    }

    constructor(uint biddingTime, uint revealTime, address payable beneficiaryAddress) {
        beneficiary = beneficiaryAddress;
        biddingEnd = block.timestamp + biddingTime;
        revealEnd = biddingEnd + revealTime;
    }

    /// 可以通过 _blindedBid = keccak256(value, fake, secret) 设置一个盲拍。
    /// 只有在出价披露阶段被正确披露，已发送的以太币才会被退还。
    /// 如果与出价一起发送的以太币至少为 value 且 fake 不为真，则出价有效。
    /// 将 fake 设置为 true，
    /// 然后发送满足订金金额但又不与出价相同的金额是隐藏实际出价的方法。
    /// 同一个地址可以放置多个出价
    function bid(bytes32 blindedBid) external payable onlyBefore(biddingEnd) {
        bids[msg.sender].push(Bid({
            blindedBid: blindedBid,
            deposit: msg.value
        }));
    }

    /// 披露你的盲拍出价
    /// 对于所有正确披露的无效出价以及除最高出价以外的所有出价，您都将获得退款
    // TODO

}