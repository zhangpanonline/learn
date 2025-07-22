// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/*
 * 投票合约
 */
contract Ballot {
    // 表示一个选民
    struct Voter {
        uint weight; // 计票权重
        bool voted; // 是否已投票
        address delegate; // 被委托人
        uint vote; // 投票提案的索引
    }

    // 提案的类型
    struct Proposal {
        bytes32 name; // 简称，最长32个字节
        uint voteCount; // 得票数
    }

    address public chairperson;
    // 声明了一个状态变量，为每个可能的地址存储一个 Voter
    mapping(address => Voter) public voters;

    // 一个 Proposal 结构类型的动态数组
    Proposal[] public proposals;

    // 为 proposalNames 中的每个提案，创建一个新的投票表决
    constructor(bytes32[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        // 对于提供的每个提案名称
        // 创建一个新的 Proposal 对象并把它添加到数组的末尾
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    // 给予 voter 在这张选票上投票的权利
    // 只有 chairperson 可以调用该函数
    function giveRightToVote(address voter) external {
        require(msg.sender == chairperson,
        "Only chairperson can give right to vote.");
        require(!voters[voter].voted,
        "The voter already voted.");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    // 把投票委托给投票者 to
    function delegate(address to) external {
        // 指定引用
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "You have no right to vote");
        require(!sender.voted, "You already voted.");

        require(to != msg.sender, "Self-delegation is disallowed");

        // 1. 委托是可以传递的，只要被委托者 `to` 也设置了委托。
        // 一般来说，这样的循环委托是非常危险的，因为如果传递的链条太长，
        // 可能需要消耗的燃料就会超过一个区块中的可用数量。
        // 这种情况下，委托不会被执行。
        // 2. 但在其他情况下，如果形成闭环，则会导致合约完全被 "卡住"。
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // 不允许闭环委托
            require(to != msg.sender, "Found loop in delegation.");
        }

        Voter storage delegate_ = voters[to];

        // 投票者不能将投票权委托给不能投票的用户
        require(delegate_.weight >= 1);

        // 由于 sender 是一个引用
        // 因此这会修改 voters[msg.sender]
        sender.voted = true;
        sender.delegate = to;

        if (delegate_.voted) {
            // 若被委托者已经透过票了，直接增加得票数
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // 若被委托者还没投票，增加委托者的权重
            delegate_.weight += sender.weight;
        }
    }

    // 把票包括委托的票
    // 投给提案
    function vote(uint proposal) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");

        sender.voted = true;
        sender.vote = proposal;

        // 如果 proposal 超过了数组的范围
        // 则会自动抛出异常，并恢复所有的改动
        proposals[proposal].voteCount += sender.weight;
    }

    // @dev 结合之前所有投票的情况下，计算出获胜的提案
    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // 调用 winningProposal 函数以获取提案数组中获胜者的索引
    // 并以此返回获胜者的名称
    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}