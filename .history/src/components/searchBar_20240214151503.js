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
      onSearch('');
    } else {
      onSearch(searchTerm);
    }
  };

  const handleCloseClick = () => {
    setSearchTerm('');
    onSearch(''); 
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
