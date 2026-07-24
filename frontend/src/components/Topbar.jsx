function Topbar() {
  return (
    <header className="flex justify-between items-center bg-white shadow px-8 py-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>
        <p className="text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Upload Content
        </button>

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}

export default Topbar;