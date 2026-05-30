import { useEffect, useState } from "react";
import API from "../api/authApi";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const registerEvent = async (eventId) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert("Please login first");
        return;
      }

      const res = await API.post(
        "/registrations",
        {
          userId: user._id,
          eventId,
        }
      );

      alert(res.data.message);

      // Refresh events after registration
      fetchEvents();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      event.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Upcoming Events
      </h1>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border p-3 rounded mb-8"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-lg p-5"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">
              {event.title}
            </h2>

            <p className="text-gray-600 mb-3">
              {event.description}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {event.date}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {event.location}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {event.category}
            </p>

            <p>
              <strong>Total Seats:</strong>{" "}
              {event.seats}
            </p>

            <p>
              <strong>Seats Left:</strong>{" "}
              {event.seats -
                (event.registeredCount || 0)}
            </p>

            {event.registeredCount >=
            event.seats ? (
              <button
                disabled
                className="mt-4 w-full bg-gray-500 text-white py-2 rounded cursor-not-allowed"
              >
                SOLD OUT
              </button>
            ) : (
              <button
                onClick={() =>
                  registerEvent(event._id)
                }
                className="mt-4 w-full bg-green-600 text-white py-2 rounded"
              >
                Register
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;