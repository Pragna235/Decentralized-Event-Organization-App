import React, { useState } from "react";

const CreateEvent = (props) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [createdEvents, setCreatedEvents] = useState([]); // State to store created events
  const [error, setError] = useState(""); // State to store error messages
  const [showCreateEvent, setShowCreateEvent] = useState(false); // State to toggle showing createEvent input fields

  const handleCreateEvent = async () => {
    // Check if the ticket count is at least 10
    if (parseInt(ticketCount) < 10) {
      setError("Minimum ticket count is 10");
      return;
    }

    setError(""); // Clear any previous error

    await props.createEventFunction(eventName, Date.parse(eventDate), parseInt(eventPrice), parseInt(ticketCount));

    // Update the created events state with the details of the created event
    setCreatedEvents([...createdEvents, { name: eventName, date: eventDate, price: eventPrice, ticketCount }]);

    // Clear input fields after creating an event
    setEventName("");
    setEventDate("");
    setEventPrice("");
    setTicketCount("");
  };

  return (
    <div className="connected-container">
        <h1 className="connected-header">You are connected to Metamask</h1>
        <p className="connected-account">Metamask Account : {props.account}</p>

      {/* Button to toggle showing the createEvent input fields */}
      <button onClick={() => setShowCreateEvent(!showCreateEvent)}>Show createEvent</button>

      {/* Display createEvent input fields when showCreateEvent is true */}
      {showCreateEvent && (
        <div>
          {/* Input fields for event details */}
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

          {/* Display error message if any */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Button to create an event */}
          <button onClick={handleCreateEvent}>Create Event</button>
        </div>
      )}

      {/* Display created events */}
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

export default CreateEvent;
