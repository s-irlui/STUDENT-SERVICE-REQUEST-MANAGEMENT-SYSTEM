import { useRequests } from '../hooks/useRequests';
import { getStatusStyle } from '../utils/formatters';

const StudentDashboard = () => {
  const { data, isLoading } = useRequests();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Requests</h2>
      {isLoading ? <p>Loading...</p> : (
        <div className="space-y-3">
          {data.map(req => (
            <div key={req.id} className="p-4 bg-white shadow rounded flex justify-between">
              <span>{req.serviceType}</span>
              <span className={`px-2 py-1 rounded text-xs ${getStatusStyle(req.status)}`}>{req.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default StudentDashboard;