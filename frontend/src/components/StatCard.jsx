function StatCard({ label, count }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center">
      <span className="text-2xl font-bold text-gray-900">{count}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}

export default StatCard;