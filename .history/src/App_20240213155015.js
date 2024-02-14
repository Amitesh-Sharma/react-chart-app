import React, { useState, useEffect } from "react";
import TableData from "../src/components/TableData";
import Chart from "../src/components/chart";
import axios from "axios";

const App = () => {
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
        {/* AI Comments */}
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
        <Chart
          data={data}
          selectedRows={selectedRows}
          numericColumns={numericColumns}
        />
        <div>
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
            // Array.from creates an array based on the length calculated for pagination
            (_, index) => {
              // For each element in the array, create a button with an onClick event
              // The key is set to the index to uniquely identify each button
              // onClick calls handlePageChange with the page number (index + 1)
              <button key={index} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>;
            }
          )}
        </div>
      </div>
    </>
  );
};

export default App;
