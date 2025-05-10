import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { user, register } = useAuth();
  const [cred, setCred] = useState({
    username: "",
    email: "",
    password: "",
    isCreator: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.isCreator) {
        navigate("/admin");
      } else {
        navigate("/blogs");
      }
    }
  }, [user, navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Background></Background>
      <div className="relative z-10 max-w-md w-full mx-4 p-8 bg-white/80 backdrop-blur-md rounded-lg shadow-lg animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Register
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register(cred);
          }}
        >
          <input
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Username"
            value={cred.username}
            onChange={(e) => setCred({ ...cred, username: e.target.value })}
          />
          <input
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Email"
            value={cred.email}
            onChange={(e) => setCred({ ...cred, email: e.target.value })}
          />
          <input
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            value={cred.password}
            onChange={(e) => setCred({ ...cred, password: e.target.value })}
          />

          {/* Checkbox for "Register as Creator" */}
          <div className="flex items-center mb-6">
            <input
              id="creator-checkbox"
              type="checkbox"
              checked={cred.isCreator || false}
              onChange={(e) =>
                setCred({ ...cred, isCreator: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="creator-checkbox"
              className="ml-2 block text-sm text-gray-700"
            >
              Register as Creator
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-white font-semibold rounded hover:scale-105 transition transform duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
