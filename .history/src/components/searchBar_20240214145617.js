// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    } else if (event.key === 'Backspace' && searchTerm === '') {
      // Handle Backspace key to show all items
      onSearch('');
    }
  };

  const handleCloseClick = () => {
    setSearchTerm('');
    onSearch(''); // Reset the search term to show all items
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
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
