import React, { useState, useEffect } from "react";
import TableData from "../src/components/TableData";
import Chart from "../src/components/chart";
import axios from "axios";
import ReactPaginate from "react-paginate"; //Imports Pagination
import '../src/App.css';

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
        const response = await axios.get(`https://dummyjson.com/products?limit=0`);
        setData(response.data.products || []); // Ensure that response.data is an array or default to an empty array
        console.log(response.data,"Data")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  // Handler for checkbox change in the table
  const handleCheckBoxChange = (id) => {
    const updatedData = data.map((row) =>
      row.id === id ? { ...row, isChecked: !row.isChecked } : row
    );
    const prevData = selectedRows.filter(row=>row.id===id)
    console.log(prevData,"prev")
    if(prevData.length >0){
      setSelectedRows(
        [...updatedData.filter((row) => row.isChecked).slice(0, itemsPerPage)]
      );
    }
    else{
      setSelectedRows(
        [...updatedData.filter((row) => row.isChecked).slice(0, itemsPerPage),...selectedRows]
      );
    }
    
  };



  // Function to calculate the total number of pages for pagination
  const handlePageCount = () => {
    return Math.ceil(data.length / itemsPerPage);
  };

  // Handler for changing the current page in pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setSelectedRows(
      data.slice(startIndex, endIndex).filter((row) => row.isChecked)
    );
  };

  // Handler for searching/filtering data
  const handleSearch = (searchTerm) => {
    const filteredData = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setData(filteredData);
    setCurrentPage(1); // Resets current page when searching
  };

  return (
    <>
      <div className="layout">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => {
            handleSearch(event.target.value);
          }}
        />

        {/* Data table component */}
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

        {/* Pagination component */}
        <ReactPaginate
          pageCount={handlePageCount()} // Call handlePageCount to get the total number of pages
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
