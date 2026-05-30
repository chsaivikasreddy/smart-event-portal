import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [user, setUser] = useState(null);

  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Smart Event Portal
        </h1>

        <div className="flex gap-4 items-center">
          <Link to="/">Home</Link>

          <Link to="/events">Events</Link>

          {user?.role === "admin" && (
            <Link to="/admin">Admin</Link>
          )}

          {user ? (
            <>
              <Link to="/dashboard">
                Dashboard
              </Link>

              <span className="font-semibold">
                {user.name}
              </span>

              <button
                onClick={logoutHandler}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="bg-gray-800 px-3 py-1 rounded"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;