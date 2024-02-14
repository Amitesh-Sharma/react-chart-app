import React, { useState, useEffect } from "react";
import TableData from "../src/components/TableData";
import Chart from "../src/components/chart";
import axios from "axios";
import ReactPaginate from "react-js-pagination"; //Imports Pagination

const App = () => {
  const handleSearch=(s)=>{

  }
  // Handles the page Count in React Paginate
  const handlePageCount = (data, itemsPerPage) => {
    return Math.ceil(data.length / itemsPerPage);
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
