import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    } else if (e.key === "Backspace" && searchTerm === "") {
      onSearch("");
    } else {
      onSearch(searchTerm);
    }
  };

  const handleCloseClick = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      {searchTerm && (
        <button className="close-button" onClick={handleCloseClick}>
          Close
        </button>
      )}
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;
