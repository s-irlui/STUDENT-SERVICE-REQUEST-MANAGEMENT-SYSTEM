import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestService } from '../services/api';

const SubmitRequest = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Transcript');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestService.create({ studentName: name, serviceType: type, status: 'Pending', date: new Date() });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">New Request</h2>
      <input className="w-full border p-2 mb-4" placeholder="Your Name" onChange={e => setName(e.target.value)} />
      <select className="w-full border p-2 mb-4" onChange={e => setType(e.target.value)}>
        <option>Transcript</option>
        <option>ID Card</option>
      </select>
      <button className="w-full bg-blue-600 text-white py-2 rounded">Submit</button>
    </form>
  );
};
export default SubmitRequest;