// Hii sijaweka nataka kwanza mwone kati ya navbar na sidebar gani iko ON




import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-slate-900 text-white p-4 flex justify-between">
    <h1 className="font-bold">StudentRequest</h1>
    <div className="space-x-4">
      <Link to="/">Dashboard</Link>
      <Link to="/submit">New Request</Link>
      <Link to="/admin" className="text-blue-400">Admin</Link>
    </div>
  </nav>
);
export default Navbar;