import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-gray-200">
        📰 React News
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/detail/1" className="hover:text-gray-200">Contoh Detail</Link>
      </div>
    </nav>
  );
}
