// src/App.js

import React, { useEffect, useState } from 'react';
import TableData from './components/TableData';
import Chart from '../src/components/chart';
import ReactPaginate from 'react-paginate';
import SearchBar from '../src/components/searchBar';
import { fetchData } from './services/api';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = await fetchData();
      setData(initialData.slice(0, 100)); // Fetch at least 100 rows
      handleInitialCheckboxCheck(initialData);
    };

    fetchInitialData();
  }, []);

    // Function to calculate the total number of pages for pagination
    const handlePageCount = () => {
      return Math.ceil(data.length / itemsPerPage);
    };
  const handleCheckboxChange = (id) => {
    const updatedData = data.map((row) =>
      row.id === id ? { ...row, isChecked: !row.isChecked } : row
    );
    setSelectedRows(
      updatedData.filter((row) => row.isChecked).slice(0, itemsPerPage)
    );
    setData(updatedData);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setSelectedRows(
      data.slice(startIndex, endIndex).filter((row) => row.isChecked)
    );
  };

  const handleSearch = (searchTerm) => {
    const filteredData = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setData(filteredData);
    setCurrentPage(1); // Resets current page when searching
  };

  const handleInitialCheckboxCheck = (initialData) => {
    const initialCheckedRows = initialData.slice(0, 5).map((row) => ({
      ...row,
      isChecked: true,
    }));
    setData((prevData) =>
      prevData.map((row) =>
        initialCheckedRows.some((checkedRow) => checkedRow.id === row.id)
          ? { ...row, isChecked: true }
          : row
      )
    );
    setSelectedRows(initialCheckedRows);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <TableData data={data} onCheckboxChange={handleCheckboxChange} />
      <Chart selectedRows={selectedRows} numericColumn="someNumericValue" />
      <ReactPaginate
          pageCount={handlePageCount()} // Call handlePageCount to get the total number of pages
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={(selected) => handlePageChange(selected.selected + 1)}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />

    </div>
  );
};

export default App;
