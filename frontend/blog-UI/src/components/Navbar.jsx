import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const homeLinkHandler = () => {
    user ? navigate('/blogs') : navigate('/')  
  }

  return (
    <nav className="font-sans bg-gradient-to-r from-blue-400 via-pink-300 via-cyan-300 to-teal-400 text-white p-4 flex justify-between shadow-md transition duration-300 ease-in-out hover:shadow-lg sticky top-0 bg-white shadow z-50">
      <h2
        to="/"
        className="text-lg font-medium tracking-wide uppercase transition transform duration-300 hover:shadow-xl hover:shadow-gray-300/50"
      >
        Blog App
      </h2>
      <div className="flex space-x-6">
        <button
          onClick={homeLinkHandler}
          className="text-lg font-medium tracking-wide uppercase transition transform duration-300 hover:shadow-xl hover:shadow-gray-300/50"
        >
          Home
        </button>
        {user ? (
          <>
            <Link
              to="/admin"
              className="text-lg font-medium tracking-wide uppercase transition transform duration-300 hover:shadow-xl hover:shadow-gray-300/50"
            >
              Create Forum
            </Link>
            <button
              onClick={handleLogout}
              className="text-lg font-medium tracking-wide uppercase transition transform duration-300 hover:shadow-xl hover:shadow-gray-300/50"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-lg font-medium tracking-wide uppercase transition transform duration-300 hover:shadow-xl hover:shadow-gray-300/50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-lg font-medium tracking-wide uppercase transition transform duration-300 hover:shadow-xl hover:shadow-gray-300/50"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
