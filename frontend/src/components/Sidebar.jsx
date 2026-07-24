import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-10 text-blue-400">
        CreatorIQ
      </h1>

      <nav className="flex flex-col gap-5">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/">Home</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;