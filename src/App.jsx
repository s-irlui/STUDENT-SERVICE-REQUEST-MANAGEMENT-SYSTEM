import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentDashboard from './pages/StudentDashboard';
import SubmitRequest from './pages/SubmitRequest';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-8 container mx-auto">
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/submit" element={<SubmitRequest />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;