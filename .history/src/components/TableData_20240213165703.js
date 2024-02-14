// This is TableData component Comprises of Table
import React from "react";
import { useTable } from "react-table";

const TableData = ({ columns, data, onCheckboxChange }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
};

return(
    <>
    <table {...getTableProps()} style={{margin:'20px'}}>
    <thead>
    {headerGroups.map(headerGroup =>(
        <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column=>(
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
        </tr>
    ))}

    </thead>
    <tbody {...getTableBodyProps()}>
{rows.map(row=>{
    prepareRow
})}
    </tbody>

    </table>
    </>
)

export default TableData;