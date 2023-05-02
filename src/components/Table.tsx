import { useMemo } from "react";
import { IUser } from "../types/Types";
import { Column, useSortBy, useTable } from "react-table";
import "../App.css";

type PropsType = {
  data: IUser[];
};

function Table(props: PropsType) {
  const columns = useMemo<Column<IUser>[]>(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

  // const memoizedResult = useMemo(compute, dependencies);
  // During initial rendering, useMemo(compute, dependencies) invokes compute, memoizes the calculation result, and returns it to the component.
  // If the dependencies don't change during the next renderings, then useMemo() doesn't invoke compute, but returns the memoized value.
  const data = useMemo(() => props.data, [props.data]);

  //   const tableInstance = useTable(
  //     {
  //         columns: columns,
  //         data: data
  //     },
  //     useSortBy
  //   )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const content = (
    <main className="section">
      <div className="container">
        <table className="table table-striped table-sm" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))
                }
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                prepareRow(row);

                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </main>
  );

  return content;
}

export default Table;
