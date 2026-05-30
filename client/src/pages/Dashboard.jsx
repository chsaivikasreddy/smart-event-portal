import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authApi";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (storedUser) {
      setUser(storedUser);
      fetchRegistrations(storedUser._id);
    }
  }, []);

  const fetchRegistrations = async (
    userId
  ) => {
    try {
      const res = await API.get(
        `/registrations/user/${userId}`
      );

      setRegistrations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Welcome {user?.name}
        </h2>

        <p>
          <strong>Email:</strong>{" "}
          {user?.email}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user?.role}
        </p>

        <button
          onClick={logoutHandler}
          className="mt-4 bg-red-600 text-white px-5 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Registered Events */}
      <div>
        <h2 className="text-3xl font-bold mb-6">
          My Registered Events
        </h2>

        {registrations.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            No registrations yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {registrations.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h3 className="text-2xl font-bold">
                  {item.eventId?.title}
                </h3>

                <p className="mt-2">
                  {item.eventId?.description}
                </p>

                <p className="mt-2">
                  <strong>Date:</strong>{" "}
                  {item.eventId?.date}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {item.eventId?.location}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {item.eventId?.category}
                </p>

                <div className="mt-4 bg-green-100 p-3 rounded">
                  <strong>
                    Ticket Number:
                  </strong>{" "}
                  {item.ticketNumber}
                </div>

                <button
                  onClick={() =>
                    navigate("/ticket", {
                      state: {
                        eventName:
                          item.eventId?.title,
                        ticketNumber:
                          item.ticketNumber,
                      },
                    })
                  }
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  View Ticket
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;