import { useRequests } from '../hooks/useRequests';
import { requestService } from '../services/api';

const AdminPanel = () => {
  const { data, refreshData } = useRequests();

  const updateStatus = async (id, status) => {
    await requestService.updateStatus(id, status);
    refreshData();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Control</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr><th>Student</th><th>Type</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {data.map(req => (
            <tr key={req.id} className="border-t text-center">
              <td className="p-2">{req.studentName}</td>
              <td className="p-2">{req.serviceType}</td>
              <td className="p-2">{req.status}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => updateStatus(req.id, 'Approved')} className="text-green-600">Approve</button>
                <button onClick={() => requestService.delete(req.id).then(refreshData)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminPanel;