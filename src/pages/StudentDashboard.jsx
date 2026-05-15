import { useRequests } from '../hooks/useRequests';
import { getStatusStyle } from '../utils/formatters';

const StudentDashboard = () => {
  const { data, isLoading } = useRequests();
  const totalRequests = data.length;
  const pendingRequests = data.filter((request) => request.status === 'Pending').length;
  const approvedRequests = data.filter((request) => request.status === 'Approved').length;

  return (
    <div className="space-y-6">
      <header className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-bold uppercase text-teal-700">Student Dashboard</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-normal text-slate-950">My Requests</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              View every request you have submitted and track its current status.
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-bold text-slate-500">Total</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{totalRequests}</p>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-bold text-slate-500">Pending</p>
          <p className="mt-2 text-3xl font-black text-amber-600">{pendingRequests}</p>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-bold text-slate-500">Approved</p>
          <p className="mt-2 text-3xl font-black text-emerald-600">{approvedRequests}</p>
        </div>
      </section>

      <section className="rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-black text-slate-950">Recent Requests</h2>
        </div>

        {isLoading ? (
          <p className="px-5 py-8 text-sm font-medium text-slate-500">Loading requests...</p>
        ) : data.length === 0 ? (
          <p className="px-5 py-8 text-sm font-medium text-slate-500">No requests submitted yet.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.map((req) => (
              <div key={req.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-black text-slate-900">{req.serviceType}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {req.studentName || 'Student'} submitted on {new Date(req.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-black ${getStatusStyle(req.status)}`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default StudentDashboard;
