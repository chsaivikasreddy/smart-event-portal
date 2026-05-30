import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedAdmin from "./components/ProtectedAdmin";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Ticket from "./pages/Ticket";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/events" element={<Events />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/ticket" element={<Ticket />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Admin />
            </ProtectedAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;