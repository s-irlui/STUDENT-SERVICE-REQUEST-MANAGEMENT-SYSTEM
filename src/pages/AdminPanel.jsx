import { useRequests } from '../hooks/useRequests';
import { requestService } from '../services/api';
import { getStatusStyle } from '../utils/formatters';

const AdminPanel = () => {
  const { data, refreshData } = useRequests();

  const updateStatus = async (id, status) => {
    await requestService.updateStatus(id, status);
    refreshData();
  };

  return (
    <div className="space-y-6">
      <header className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-bold uppercase text-teal-700">Admin Control</p>
        <h1 className="font-heading mt-2 text-3xl font-black tracking-normal text-slate-950">Request Management</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Review submitted requests and update their progress.
        </p>
      </header>

      <section className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-slate-50 text-xs font-black uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((req) => (
                <tr key={req.id} className="text-sm">
                  <td className="px-5 py-4 font-black text-slate-900">{req.studentName}</td>
                  <td className="px-5 py-4 font-medium text-slate-600">{req.serviceType}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${getStatusStyle(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => updateStatus(req.id, 'Approved')}
                        className="min-h-9 rounded-lg bg-emerald-50 px-3 text-xs font-black text-emerald-700 transition hover:bg-emerald-100"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => requestService.delete(req.id).then(refreshData)}
                        className="min-h-9 rounded-lg bg-rose-50 px-3 text-xs font-black text-rose-700 transition hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
export default AdminPanel;
