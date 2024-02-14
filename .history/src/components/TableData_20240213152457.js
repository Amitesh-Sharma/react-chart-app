// This is TableData component Comprises of Table
import React from "react";
import { useTable } from "react-table";

const TableData = ({ columns, data, onCheckboxChange }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
};

return(
    <></>
)

export default TableData;