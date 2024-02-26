import React from "react";
// styles
import "./Table.styles.scss";

const Table = ({ data, columns }, ...otherProps) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((item) => (
            <TableField item={item} key={item.key} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow item={item} columns={columns} key={item.card_id} />
        ))}
      </tbody>
    </table>
  );
};

const TableField = ({ item }) => <th>{item.heading}</th>;

const TableRow = ({ item, columns }) => (
  // represents a single column in a single row
  <tr>
    {columns.map((columnItem) => {
      return <td key={columnItem.key}>{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);

export default Table;
