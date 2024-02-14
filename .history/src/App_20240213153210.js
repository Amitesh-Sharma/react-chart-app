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
        {header: 'ID', accessor:'id'},
        {header:'Name', }
      ]}
      
      />
    </div>
  );
};
