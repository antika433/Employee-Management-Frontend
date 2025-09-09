// Home.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
import axios from "axios";
import { BACKEND_URL } from "./Config";
import "./App.css";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState({ name: "", manager: "", salary: "" });
  const [showCancel, setShowCancel] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const columns = useMemo(
    () => [
      { Header: "EmployeeId", accessor: "employeeId" },
      { Header: "Name", accessor: "name" },
      { Header: "Manager", accessor: "manager" },
      { Header: "Salary", accessor: "salary" },
      {
        Header: "Edit",
        id: "Edit",
        Cell: (props) => (
          <button className="editBtn" onClick={() => handleUpdate(props.cell.row.original)}>
            Edit
          </button>
        ),
      },
      {
        Header: "Delete",
        id: "Delete",
        Cell: (props) => (
          <button className="deleteBtn" onClick={() => handleDelete(props.cell.row.original)}>
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const getAllEmployees = () => {
    axios
      .get(`${BACKEND_URL}/employees`)
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handleUpdate = (emp) => {
    setEmployeeData(emp);
    setShowCancel(true);
  };

  const clearAll = () => {
    setEmployeeData({ name: "", manager: "", salary: "" });
    setShowCancel(false);
    getAllEmployees();
  };

  const handleDelete = async (emp) => {
    const isConfirmed = window.confirm("Are you sure you want to Delete?");
    if (isConfirmed) {
      await axios.delete(`${BACKEND_URL}/employees/${emp.employeeId}`);
      getAllEmployees();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeData.name || !employeeData.manager || !employeeData.salary) {
      setErrMsg("All fields are required!");
      return;
    }

    if (employeeData.employeeId) {
      await axios.patch(`${BACKEND_URL}/employees/${employeeData.employeeId}`, employeeData);
    } else {
      await  axios.post(`${BACKEND_URL}/employees`, employeeData);
    }

    clearAll();
  };

  const handleCancel = () => {
    setEmployeeData({ name: "", manager: "", salary: "" });
    setShowCancel(false);
  };

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    setErrMsg("");
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    pageCount,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
  } = useTable(
    { columns, data: employees, initialState: { pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <div className="main-container">
      {errMsg && <span className="error">{errMsg}</span>}
      <h1>Add the Employee Details</h1>
      {/* Add / Update Panel */}
      <div className="add-panel">
        <div className="addpaneldiv">
          <label htmlFor="name">Name</label> <br />
          <input
            className="addpanelinput"
            value={employeeData.name}
            type="text"
            onChange={handleChange}
            name="name"
            id="name"
          />
        </div>
        <div className="addpaneldiv">
          <label htmlFor="manager">Manager</label> <br />
          <input
            className="addpanelinput"
            type="text"
            value={employeeData.manager}
            onChange={handleChange}
            name="manager"
            id="manager"
          />
        </div>
        <div className="addpaneldiv">
          <label htmlFor="salary">Salary</label> <br />
          <input
            className="addpanelinput"
            type="text"
            value={employeeData.salary}
            onChange={handleChange}
            name="salary"
            id="salary"
          />
        </div>
        <button className="addBtn" onClick={handleSubmit}>
          {employeeData.employeeId ? "Update" : "Add"}
        </button>
        <button className="cancelBtn" disabled={!showCancel} onClick={handleCancel}>
          Cancel
        </button>
      </div>

      {/* Search */}
      <div className="SearchAndEmtable">
        <div><h3>Employee Table...</h3></div>
        <div>
      <input
        className="searchinput"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        type="search"
        placeholder="Search Employee Here"
      />
      </div>

      </div>

      
      {/* Table */}
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()} key={hg.id}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                  {column.render("Header")}
                  {column.isSorted && <span>{column.isSortedDesc ? " ⬆️" : " ⬇️"}</span>}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagediv">
        <button disabled={!canPreviousPage} className="pageBtn" onClick={() => gotoPage(0)}>
          First
        </button>
        <button disabled={!canPreviousPage} className="pageBtn" onClick={previousPage}>
          Prev
        </button>
        <span className="idx">
          {pageIndex + 1} of {pageCount}
        </span>
        <button disabled={!canNextPage} className="pageBtn" onClick={nextPage}>
          Next
        </button>
        <button disabled={!canNextPage} className="pageBtn" onClick={() => gotoPage(pageCount - 1)}>
          Last
        </button>
      </div>
    </div>
  );
};

export default Home;
