//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct TransactionStruct {
        uint256 transaction_id;
        address sender;
        address receiver;
        uint256 init_id;
        uint256 timestamp;
        uint256 amount;
        string message;
    }
    TransactionStruct[] transactions;
    uint256 transactionsCount;

    struct InitiativeStruct {
        uint256 id;
        address owner;
        string poster;
        string title;
        uint256 target;
        uint256 collected;
        string description;
        bool isActive;
        uint256[] transactionsIds;
    }

    InitiativeStruct[] initiatives;
    uint256 initiativesCount;

    function getAllInitiatives()
        public
        view
        returns (InitiativeStruct[] memory)
    {
        return initiatives;
    }

    event Upload(
        uint256 id,
        address owner,
        string poster,
        string title,
        uint256 target,
        uint256 collected,
        string description,
        bool isActive,
        uint256[] transactionsIds
    );

    function uploadInitiative(
        string memory poster,
        string memory title,
        uint256 target,
        string memory description
    ) public {
        uint256[] memory transactionsIds;
        initiatives.push(
            InitiativeStruct(
                initiativesCount,
                msg.sender,
                poster,
                title,
                target,
                0,
                description,
                true,
                transactionsIds
            )
        );
        initiativesCount++;
        emit Upload(
            initiativesCount,
            msg.sender,
            poster,
            title,
            target,
            0,
            description,
            true,
            transactionsIds
        );
    }

    event Change(InitiativeStruct changedInitiative);

    function changeTarget(uint256 id, uint256 newTarget) public {
        require(
            id >= 0 &&
                id <= initiativesCount &&
                msg.sender == initiatives[id].owner
        );
        initiatives[id].target = newTarget;
        emit Change(initiatives[id]);
    }

    function deleteInitiative(uint256 id) public {
        require(
            id >= 0 &&
                id <= initiativesCount &&
                msg.sender == initiatives[id].owner
        );
        initiatives[id].isActive = false;
        emit Change(initiatives[id]);
    }

    event Transfer(
        address sender,
        address receiver,
        InitiativeStruct initiative,
        uint256 timestamp,
        uint256 amount
    );

    function donate(
        uint256 id,
        uint256 amount,
        string memory message
    ) public {
        require(
            id >= 0 &&
                id < initiativesCount
        );
        transactions.push(
            TransactionStruct(
                transactionsCount,
                msg.sender,
                initiatives[id].owner,
                id,
                block.timestamp,
                amount,
                message
            )
        );
        initiatives[id].collected = initiatives[id].collected + amount;
        initiatives[id].transactionsIds.push(transactionsCount);
        transactionsCount++;
        emit Transfer(
            msg.sender,
            initiatives[id].owner,
            initiatives[id],
            amount,
            block.timestamp
        );
    }

    function getTransaction(uint256 id)
        public
        view
        returns (TransactionStruct memory)
    {
        return transactions[id];
    }
}
