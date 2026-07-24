function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-600">
        CreatorIQ
      </h1>

      <div className="space-x-6">
        <a href="/" className="hover:text-blue-600">
          Home
        </a>

        <a href="/login" className="hover:text-blue-600">
          Login
        </a>

        <a href="/signup" className="hover:text-blue-600">
          Signup
        </a>
      </div>
    </nav>
  );
}

export default Navbar;