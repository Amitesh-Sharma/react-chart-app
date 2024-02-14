import React, { useState, useEffect } from "react";
import TableData from "../src/components/TableData";
import Chart from "../src/components/chart";
import axios from "axios";
import ReactPaginate from "react-js-pagination"; //Imports Pagination

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [numericColumn, setNumericColumn] = useState("someNumericValue");
  const [itemsPerPage] = useState(5);

  const handleCheckBoxChange = (id) => {
    const updatedData = data.map((row) =>
      row.id === id ? { ...row, isChecked: !row.isChecked } : row
    );
    setSelectedRows(
      updatedData.filter((row) => row.isChecked).slice(0, itemsPerPage)
    );
  };

  const handlePageCount = (data, itemsPerPage) => {
    return Math.ceil(data.length / itemsPerPage);
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

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => {
            handleSearch(event.target.value);
          }}
        />
        {/* Use AI Comments */}
        <TableData
          columns={[
            { Header: "ID", accessor: "id" },
            { Header: "Name", accessor: "name" },
            { Header: "Value1", accessor: "value1" },
            { Header: "Value2", accessor: "value2" },
          ]}
          // Here slice is used to return a new array of data in props .
          data={data.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )}
          onCheckboxChange={handleCheckBoxChange}
        />
        {/* Use AI Comments  */}
        <Chart
          data={data}
          selectedRows={selectedRows}
          numericColumns={numericColumns}
        />
        <ReactPaginate
          pageCount={handlePageCount}
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
