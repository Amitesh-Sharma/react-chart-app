// src/components/SearchBar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCleared, setIsCleared] = useState(true);

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
    setIsCleared(inputText === ''); // Update isCleared based on inputText
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setIsCleared(true);
    onSearch(''); // Reset the search term to show all items
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {isCleared ? (
        <faSearch className="search-icon" onClick={handleSearchClick} />
      ) : (
        <faTimes className="close-icon" onClick={handleClearClick} />
      )}
    </div>
  );
};

export default SearchBar;
