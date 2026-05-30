import { useState } from "react";
import API from "../api/authApi";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/register",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 shadow rounded">
      <h2 className="text-3xl font-bold mb-5">
        Register
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 mb-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 mb-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 mb-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Register;