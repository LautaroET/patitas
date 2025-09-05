import React, { useState } from "react";

function SearchInput({ onSearchChange }) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearchChange("");
  };

  return (
    <div className="relative mb-8 max-w-lg mx-auto">
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Buscar por nombre o ubicación"
        className="w-full p-3 pl-10 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
        <i className="bi bi-search text-xl"></i>
      </div>
      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
        >
          <i className="bi bi-x-circle-fill text-xl"></i>
        </button>
      )}
    </div>
  );
}

export default SearchInput;

