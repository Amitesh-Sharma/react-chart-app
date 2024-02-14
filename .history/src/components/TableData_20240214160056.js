// This is TableData component Comprises of Table
import React from "react";
import { useTable } from "react-table";
import '../../src/components/Table.css'; 

const TableData = ({ columns, data, onCheckboxChange }) => {
  // Use the useTable hook to create table instances
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <>
      {/* Table element with properties from useTable hook */}
      <table {...getTableProps()} style={{ margin: "20px" }}>
        <thead>
          {headerGroups?.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers?.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows?.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells?.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                {/* Additional cell for checkbox */}
                <td>
                  {/* Checkbox for each row, controlled by onCheckboxChange function */}
                  <input
                    className="Checkbox-cursor"
                    type="checkbox"
                    checked={row.original.isChecked}
                    onChange={() => onCheckboxChange(row.original.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableData;
