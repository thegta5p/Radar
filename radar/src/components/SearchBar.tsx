import React from "react";

export default function SearchBar() {
  return (
    <input
      className="w-64 h-10 pl-3 pr-3 bg-white text-gray-700 border rounded-lg focus:outline-none"
      type="text"
      placeholder="Search for a game or tag"
    />
  );
}
