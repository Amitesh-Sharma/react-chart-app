import React, { useState, useEffect } from "react";
import TableData from "../src/components/TableData";
import Chart from "../src/components/chart";
import axios from "axios";
import ReactPaginate from "react-paginate"; 
import SearchBar from "./components/searchBar";
import "../src/App.css";

const App = () => {
  // State variables to manage data, pagination, selected rows, numeric column, and items per page
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [numericColumn, setNumericColumn] = useState("Price Report");
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products?limit=0`
        );
        setData(response.data.products || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

// Checkbox Handler
  const handleCheckBoxChange = (id) => {
    const updatedData = data.map((row) =>
      row.id === id ? { ...row, isChecked: !row.isChecked } : row
    );
  
    const checkedRows = updatedData.filter((row) => row.isChecked);
  
    if (checkedRows.length <= itemsPerPage) {
      setSelectedRows(checkedRows);
    } else {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setSelectedRows(checkedRows.slice(startIndex, endIndex));
    }
    setData(updatedData);
  };

  // 
  const handlePageCount = () => {
    return Math.ceil(data.length / itemsPerPage);
  };

   // Handler for Pagination
   const handlePageChange = (pageNumber) => {
     const startIndex = (pageNumber - 1) * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
    setCurrentPage(pageNumber);
    setSelectedRows(
      data.slice(startIndex, endIndex).filter((row) => row.isChecked)
    );
  };


  // Handler for search
  const handleSearch = (searchTerm) => {
    const filteredData = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setData(filteredData);
    setCurrentPage(1); 
  };

  return (
    <>
      <div className="layout">
        <SearchBar onSearch={handleSearch} />
        {/* Table Data component */}
        <TableData
          columns={[
            { Header: "Id", accessor: "id" },
            { Header: "Name", accessor: "title" },
            { Header: "Description", accessor: "description" },
            { Header: "Price", accessor: "price" },
          ]}
          data={data.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )}
          onCheckboxChange={handleCheckBoxChange}
        />

        {/* Chart component */}
        <Chart
          data={data}
          selectedRows={selectedRows}
          numericColumn={numericColumn}
        />

        {/* React Paginate */}
        <ReactPaginate
          pageCount={handlePageCount()}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={(selected) => handlePageChange(selected.selected + 1)}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default App;
