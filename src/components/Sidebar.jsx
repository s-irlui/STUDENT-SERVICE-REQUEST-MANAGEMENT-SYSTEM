import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', shortName: 'Home', icon: 'D' },
    { name: 'New Request', path: '/submit', shortName: 'Request', icon: '+' },
    { name: 'Admin Panel', path: '/admin', shortName: 'Admin', icon: 'A' },
  ];

  return (
    <aside className="border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur lg:fixed lg:left-0 lg:top-0 lg:flex lg:min-h-screen lg:w-72 lg:flex-col lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
      <div className="flex items-center justify-between gap-4 lg:block">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-base font-black text-white shadow-sm">
            SH
          </span>
          <span>
            <span className="block text-lg font-black leading-tight tracking-normal text-slate-950">
              StudentHub
            </span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
              Service requests
            </span>
          </span>
        </Link>
      </div>

      <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:flex-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex min-h-11 shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold transition-colors lg:w-full ${
              location.pathname === link.path 
                ? 'bg-teal-50 text-teal-800 ring-1 ring-teal-100' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            }`}
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-black ${
              location.pathname === link.path ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {link.icon}
            </span>
            <span className="lg:hidden">{link.shortName}</span>
            <span className="hidden lg:inline">{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-6 hidden rounded-lg border border-slate-200 bg-slate-50 p-4 lg:block">
        <p className="text-xs font-bold uppercase text-slate-500"></p>
        <p className="mt-1 text-sm font-semibold text-slate-800">2026 Student service <v1 className="0"></v1></p>
      </div>
    </aside>
  );
};

export default Sidebar;
