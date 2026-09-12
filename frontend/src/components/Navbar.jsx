import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <Link to="/" className="font-bold text-xl text-gray-900 no-underline">
        JobTrack
      </Link>
      <div className="flex gap-6">
        <Link to="/login" className="text-gray-700 no-underline hover:text-gray-900">
          Login
        </Link>
        <Link to="/register" className="text-gray-700 no-underline hover:text-gray-900">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;