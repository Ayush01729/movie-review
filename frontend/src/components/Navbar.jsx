// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold text-gray-800">
        {" "}
        <Link to="/"> MOVIECRITIC </Link>
      </h1>
      <div className="space-x-4">
        <Link to="/add-movie">
          <button className="bg-purple-500 text-white px-4 py-2 rounded">
            Add new movie
          </button>
        </Link>
        <Link to="/search-review">
          <button className="bg-purple-500 text-white px-4 py-2 rounded">
            Search Review
          </button>
        </Link>
        <Link to="/add-review">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add new review
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
