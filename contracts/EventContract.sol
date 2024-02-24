// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EventContract{
    struct Event{
        address organizer;
        string name;
        uint date; //0,1,2
        uint price;
        uint ticketCount; //1 sec 0.5 sec
        uint ticketRemain;
    }

    mapping(uint=>Event) public events;
    mapping(address=>mapping(uint=>uint)) public tickets;
    uint public nextId;

    function createEvent(string memory name,uint date, uint price,uint ticketCount) external{
        require(date>block.timestamp,"You can organize event for a future date");
        require(ticketCount>10,"You can organize an event only you create more than 10 tickets");

        events[nextId] = Event(msg.sender,name,date,price,ticketCount,ticketCount);
        nextId++;
    }

    function buyTicket(uint id, uint quantity) external payable{
        require(events[id].date!=0,"Event does not exist"); //if no event is created yet
        require(events[id].date>block.timestamp,"Event has already occurred");

        Event storage _event = events[id];

        require(msg.value == (_event.price*quantity),"Ether is not enough");
        require(_event.ticketRemain>=quantity,"Not enought tickets");

        _event.ticketRemain -= quantity;
        tickets[msg.sender][id] += quantity;


    }

    function transferTicket(uint id,uint quantity, address to)external{
        require(events[id].date!=0,"Event does not exist");
        require(events[id].date>block.timestamp,"Event has alsready occurred");
        require(tickets[msg.sender][id]>=quantity,"You do not have enough tickets");

        tickets[msg.sender][id] -= quantity;
        tickets[to][id] += quantity;
    }
}

    







