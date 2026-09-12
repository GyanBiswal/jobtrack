import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const STATUSES = ['Wishlist', 'Applied', 'OA', 'Interview', 'Offer', 'Rejected'];

const emptyForm = {
  company: '',
  role: '',
  location: '',
  status: 'Wishlist',
  appliedDate: '',
  jobUrl: '',
  notes: '',
};

function JobForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    api
      .get(`/jobs/${id}`)
      .then((res) => {
        const job = res.data.job;
        setForm({
          company: job.company || '',
          role: job.role || '',
          location: job.location || '',
          status: job.status || 'Wishlist',
          appliedDate: job.appliedDate ? job.appliedDate.slice(0, 10) : '',
          jobUrl: job.jobUrl || '',
          notes: job.notes || '',
        });
      })
      .catch(() => setError('Failed to load application'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (isEdit) {
        await api.put(`/jobs/${id}`, form);
      } else {
        await api.post('/jobs', form);
      }
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Application' : 'New Application'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <label className="text-sm text-gray-600 -mb-2">Applied date</label>
        <input
          type="date"
          name="appliedDate"
          value={form.appliedDate}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <input
          type="url"
          name="jobUrl"
          placeholder="Job posting URL"
          value={form.jobUrl}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-gray-900 text-white rounded-md py-2 px-4 hover:bg-gray-700 disabled:opacity-50"
          >
            {submitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Application'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/jobs')}
            className="text-gray-600 rounded-md py-2 px-4 border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;