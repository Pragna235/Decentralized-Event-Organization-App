import React, { useState } from "react";

const Connected = (props) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [buyTicketEventId, setBuyTicketEventId] = useState("");
  const [buyTicketQuantity, setBuyTicketQuantity] = useState("");
  const [createdEvents, setCreatedEvents] = useState([]);
  const [error, setError] = useState("");
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showBuyTicket, setShowBuyTicket] = useState(false);

  const handleCreateEvent = async () => {
    if (parseInt(ticketCount) < 10) {
      setError("Minimum ticket count is 10");
      return;
    }

    setError("");

    await props.createEventFunction(eventName, Date.parse(eventDate), parseInt(eventPrice), parseInt(ticketCount));

    setCreatedEvents([...createdEvents, { name: eventName, date: eventDate, price: eventPrice, ticketCount }]);

    setEventName("");
    setEventDate("");
    setEventPrice("");
    setTicketCount("");
  };

  const handleBuyTicket = async () => {
    if (!buyTicketEventId || !buyTicketQuantity || parseInt(buyTicketQuantity) <= 0) {
      setError("Invalid input for buying tickets");
      return;
    }

    setError("");

    await props.buyTicketFunction(buyTicketEventId, parseInt(buyTicketQuantity));

    setBuyTicketEventId("");
    setBuyTicketQuantity("");
  };

  return (
    <div className="connected-container">
      <h1 className="connected-header">You are connected to Metamask</h1>
      <p className="connected-account">Metamask Account: {props.account}</p>

      <button onClick={() => setShowCreateEvent(!showCreateEvent)}>Show createEvent</button>

      {showCreateEvent && (
        <div>
          <div>
            <label>Event Name:</label>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div>
            <label>Event Date:</label>
            <input type="text" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          </div>
          <div>
            <label>Event Price:</label>
            <input type="number" value={eventPrice} onChange={(e) => setEventPrice(e.target.value)} />
          </div>
          <div>
            <label>Ticket Count:</label>
            <input type="number" value={ticketCount} onChange={(e) => setTicketCount(e.target.value)} />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button onClick={handleCreateEvent}>Create Event</button>
        </div>
      )}

      <button onClick={() => setShowBuyTicket(!showBuyTicket)}>Show Buy Ticket</button>

      {showBuyTicket && (
        <div>
          <div>
            <label>Event ID for Buying Tickets:</label>
            <input type="text" value={buyTicketEventId} onChange={(e) => setBuyTicketEventId(e.target.value)} />
          </div>
          <div>
            <label>Quantity of Tickets to Buy:</label>
            <input type="number" value={buyTicketQuantity} onChange={(e) => setBuyTicketQuantity(e.target.value)} />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button onClick={handleBuyTicket}>Buy Tickets</button>
        </div>
      )}

      <div>
        <h2>Created Events:</h2>
        <ul>
          {createdEvents.map((event, index) => (
            <li key={index}>
              Name: {event.name}, Date: {event.date}, Price: {event.price}, Ticket Count: {event.ticketCount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Connected;
