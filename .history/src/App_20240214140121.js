// src/App.js

import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import Chart from './components/Chart';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
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
      <DataTable data={data} onCheckboxChange={handleCheckboxChange} />
      <Chart selectedRows={selectedRows} numericColumn="someNumericValue" />
      <Pagination
        pageCount={Math.ceil(data.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
