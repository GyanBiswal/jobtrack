import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import JobCard from '../components/JobCard';
import Spinner from '../components/Spinner';

const STATUSES = ['All', 'Wishlist', 'Applied', 'OA', 'Interview', 'Offer', 'Rejected'];

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const res = await api.get('/jobs', { params });
      setJobs(res.data.jobs);
      setError('');
    } catch {
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(fetchJobs, 300); // debounce search
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch {
      alert('Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Applications</h2>
        <Link
          to="/jobs/new"
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700"
        >
          + Add Application
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading && <Spinner />}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && jobs.length === 0 && (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-3">
            {search || statusFilter !== 'All'
              ? 'No applications match your filters.'
              : "You haven't added any applications yet."}
          </p>
          <Link to="/jobs/new" className="text-gray-900 underline text-sm">
            Add your first application
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Jobs;