import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import StatCard from '../components/StatCard';

const STATUS_ORDER = ['Wishlist', 'Applied', 'OA', 'Interview', 'Offer', 'Rejected'];

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/jobs/stats/summary')
      .then((res) => setStats(res.data))
      .catch(() => setError('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Link
          to="/jobs/new"
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700"
        >
          + Add Application
        </Link>
      </div>

      <p className="text-gray-600 mb-6">
        Total applications: <span className="font-semibold">{stats.total}</span>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {STATUS_ORDER.map((status) => (
          <StatCard key={status} label={status} count={stats.byStatus[status]} />
        ))}
      </div>

      <div className="mt-8">
        <Link to="/jobs" className="text-gray-900 underline text-sm">
          View all applications →
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;