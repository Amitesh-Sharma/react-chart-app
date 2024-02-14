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
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) })}
        </div>
      </div>
    </>
  );
};
