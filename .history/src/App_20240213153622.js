import React, { useState, useEffect } from "react";
import TableData from "../src/components/TableData";
import Chart from "../src/components/chart";
import axios from "axios";

const App = () => {
  return (
    <div>
      <input type="text" placeholder="Search" onChange={(e) => {}} />
      <TableData
        columns={[
          { Header: "ID", accessor: "id" },
          { Header: "Name", accessor: "name" },
          { Header: "Value1", accessor: "value1" },
          { Header: "Value2", accessor: "value2" },
        ]}
        data={data.slice((currentPage - 1)* itemsPerPage, currentPage * itemsPerPage)}
      />
    </div>
  );
};
