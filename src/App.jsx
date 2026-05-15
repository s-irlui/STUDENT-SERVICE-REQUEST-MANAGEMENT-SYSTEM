import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StudentDashboard from './pages/StudentDashboard';
import SubmitRequest from './pages/SubmitRequest';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100 text-slate-900 lg:flex">
        <Sidebar />
        <main className="min-h-screen flex-1 px-4 py-6 sm:px-6 lg:ml-72 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <Routes>
              <Route path="/" element={<StudentDashboard />} />
              <Route path="/submit" element={<SubmitRequest />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
