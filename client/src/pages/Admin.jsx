import { useEffect, useState } from "react";
import API from "../api/authApi";
import AnalyticsChart from "../components/AnalyticsChart";

function Admin() {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    registrations: 0,
  });

  const [events, setEvents] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      title: "",
      description: "",
      date: "",
      location: "",
      category: "",
      seats: "",
      image: "",
    });

  const [eventData, setEventData] =
    useState({
      title: "",
      description: "",
      date: "",
      location: "",
      category: "",
      seats: "",
      image: "",
    });

  useEffect(() => {
    fetchStats();
    fetchEvents();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get(
        "/admin/stats"
      );

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await API.get(
        "/events"
      );

      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]:
        e.target.value,
    });
  };

  const createEvent = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/events",
        eventData
      );

      alert(res.data.message);

      setEventData({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        seats: "",
        image: "",
      });

      fetchStats();
      fetchEvents();
    } catch (error) {
      alert(
        "Failed to Create Event"
      );
    }
  };

  const deleteEvent = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this event?"
      );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(
        `/events/${id}`
      );

      alert(res.data.message);

      fetchStats();
      fetchEvents();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const startEdit = (event) => {
    setEditingId(event._id);

    setEditData({
      title: event.title,
      description:
        event.description,
      date: event.date,
      location:
        event.location,
      category:
        event.category,
      seats: event.seats,
      image: event.image,
    });
  };

  const updateEvent = async () => {
    try {
      const res = await API.put(
        `/events/${editingId}`,
        editData
      );

      alert(res.data.message);

      setEditingId(null);

      fetchEvents();
    } catch (error) {
      console.log(error);

      alert(
      error.response?.data?.message ||
      error.message
     ); }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* Analytics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">
            Total Users
          </h2>

          <p className="text-4xl mt-3">
            {stats.users}
          </p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">
            Total Events
          </h2>

          <p className="text-4xl mt-3">
            {stats.events}
          </p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">
            Registrations
          </h2>

          <p className="text-4xl mt-3">
            {stats.registrations}
          </p>
        </div>
      </div>

      <AnalyticsChart stats={stats} />

      <div className="mb-8">
        <a
          href="http://localhost:5000/api/export/registrations"
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Export Registrations CSV
        </a>
      </div>

      {/* Create Event */}
      <form
        onSubmit={createEvent}
        className="bg-white shadow-lg p-6 rounded-lg mb-10"
      >
        <h2 className="text-2xl font-bold mb-4">
          Create Event
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleChange}
          className="w-full border p-3 mb-3"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={
            eventData.description
          }
          onChange={handleChange}
          className="w-full border p-3 mb-3"
          required
        />

        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="w-full border p-3 mb-3"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={handleChange}
          className="w-full border p-3 mb-3"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={eventData.category}
          onChange={handleChange}
          className="w-full border p-3 mb-3"
        />

        <input
          type="number"
          name="seats"
          placeholder="Seats"
          value={eventData.seats}
          onChange={handleChange}
          className="w-full border p-3 mb-3"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={eventData.image}
          onChange={handleChange}
          className="w-full border p-3 mb-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Create Event
        </button>
      </form>

      {/* Edit Event */}
      {editingId && (
        <div className="bg-yellow-100 p-6 rounded-lg mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Edit Event
          </h2>

          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({
                ...editData,
                title:
                  e.target.value,
              })
            }
            className="w-full border p-3 mb-3"
          />

          <textarea
            value={
              editData.description
            }
            onChange={(e) =>
              setEditData({
                ...editData,
                description:
                  e.target.value,
              })
            }
            className="w-full border p-3 mb-3"
          />

          <button
            onClick={updateEvent}
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Update Event
          </button>
        </div>
      )}

      {/* Event List */}
      <div>
        <h2 className="text-3xl font-bold mb-6">
          All Events
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-lg p-5"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-2xl font-bold">
                {event.title}
              </h3>

              <p className="mt-2">
                {event.description}
              </p>

              <p className="mt-2">
                <strong>Date:</strong>{" "}
                {event.date}
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}
                {event.location}
              </p>

              <p>
                <strong>
                  Category:
                </strong>{" "}
                {event.category}
              </p>

              <p>
                <strong>
                  Seats:
                </strong>{" "}
                {event.seats}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    
                    startEdit(event)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteEvent(
                      event._id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;