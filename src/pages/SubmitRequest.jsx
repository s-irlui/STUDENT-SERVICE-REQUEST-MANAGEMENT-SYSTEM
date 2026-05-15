import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestService } from '../services/api';

const SubmitRequest = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Transcript');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    await requestService.create({ studentName: name, serviceType: type, status: 'Pending', date: new Date() });
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6">
        <p className="text-sm font-bold uppercase text-teal-700">New Request</p>
        <h1 className="mt-2 text-3xl font-black tracking-normal text-slate-950">Submit a Service Request</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Fill in the details below and your request will be added to the queue for sure.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="space-y-5">
          <label className="block">
            <span className="text-sm font-black text-slate-800">Student Name</span>
            <input
              className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-800">Service Type</span>
            <select
              className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Transcript</option>
              <option>ID Card</option>
              <option>Clearance Letter</option>
              <option>Fee Statement</option>
            </select>
          </label>
        </div>

        <button className="mt-6 min-h-12 w-full rounded-lg bg-teal-600 px-4 text-sm font-black text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-100">
          Submit Request
        </button>
      </form>
    </div>
  );
};
export default SubmitRequest;
