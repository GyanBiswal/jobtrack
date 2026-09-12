import { Link } from 'react-router-dom';

const STATUS_COLORS = {
  Wishlist: 'bg-gray-100 text-gray-700',
  Applied: 'bg-blue-100 text-blue-700',
  OA: 'bg-purple-100 text-purple-700',
  Interview: 'bg-yellow-100 text-yellow-700',
  Offer: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

function JobCard({ job, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-gray-900">{job.role}</h3>

        <p className="text-gray-600 text-sm">
          {job.company}
        </p>

        {job.location && (
          <p className="text-gray-400 text-xs mt-1">
            {job.location}
          </p>
        )}

        {job.jobUrl && (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-gray-500 underline"
          >
            Job posting
          </a>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            STATUS_COLORS[job.status]
          }`}
        >
          {job.status}
        </span>

        <div className="flex gap-3 text-xs">
          <Link
            to={`/jobs/${job._id}/edit`}
            className="text-gray-600 underline"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(job._id)}
            className="text-red-600 underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;