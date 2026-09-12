import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex flex-wrap items-center justify-between gap-y-2 px-4 sm:px-8 py-4 bg-white border-b border-gray-200">
      <Link to="/" className="font-bold text-xl text-gray-900 no-underline">
        JobTrack
      </Link>
      <div className="flex items-center gap-3 sm:gap-6 text-sm">
        {user ? (
          <>
            <Link to="/" className="text-gray-700 no-underline hover:text-gray-900">
              Dashboard
            </Link>
            <Link to="/jobs" className="text-gray-700 no-underline hover:text-gray-900">
              Jobs
            </Link>
            <span className="hidden sm:inline text-gray-400">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 no-underline hover:text-gray-900">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 no-underline hover:text-gray-900">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;