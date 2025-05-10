import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Background from '../components/Background';

export default function Login() {
  const { login, user } = useAuth();
  const [cred, setCred] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.isCreator) {
        navigate('/admin');
      } else {
        navigate('/blogs');
      }
    }
  }, [user, navigate]);

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <Background></Background>

        {/* Login Form */}
        <div className="relative z-10 max-w-md w-full mx-4 p-8 bg-white/80 backdrop-blur-md rounded-lg shadow-lg animate-fadeIn">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Login
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(cred);
            }}
          >
            <input
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Email"
              value={cred.email}
              onChange={(e) => setCred({ ...cred, email: e.target.value })}
            />
            <input
              className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              value={cred.password}
              onChange={(e) => setCred({ ...cred, password: e.target.value })}
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-white font-semibold rounded hover:scale-105 transition transform duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
