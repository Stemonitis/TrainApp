import React, { useEffect, useLayoutEffect, useState } from "react";
import "./DataDisplay.css";
import DownloadData from "./DownloadData.js";

const DataDisplay = ({ csv }) => {
  const [page, setPage] = useState(0);
  const [sortType, setSortType] = useState("Train Line");
  const [tableData, setTableData] = useState([]);
  const [newEntry, setNewEntry] = useState(false);
  const [edit, setEdit] = useState(new Array(csv.length).fill(false));

  //hooks for adding a new entry
  const [trainLine, setTrainLine] = useState("");
  const [route, setRoute] = useState("");
  const [runNumber, setRunNumber] = useState("");
  const [operatorID, setOperatorID] = useState("");

  //hooks for editing
  const [trainLineEdit, setTrainLineEdit] = useState("");
  const [routeEdit, setRouteEdit] = useState("");
  const [runNumberEdit, setRunNumberEdit] = useState("");
  const [operatorIDEdit, setOperatorIDEdit] = useState("");

  function editEntry(e) {
    const eInd = e.target.dataset.edit;
    const newEdit = new Array(csv.length).fill(false);
    newEdit[eInd] = true;
    setEdit(newEdit);
    const currentValues = [...tableData[eInd]];
    setTrainLineEdit(currentValues[0]);
    setRouteEdit(currentValues[1]);
    setRunNumberEdit(currentValues[2]);
    setOperatorIDEdit(currentValues[3]);
  }
  function setRow(e) {
    if (e.target.dataset.editrow === "0") {
      setTrainLineEdit(e.target.value);
    } else if (e.target.dataset.editrow === "1") {
      setRouteEdit(e.target.value);
    } else if (e.target.dataset.editrow === "2") {
      setRunNumberEdit(e.target.value);
    } else if (e.target.dataset.editrow === "3") {
      setOperatorIDEdit(e.target.value);
    }
  }
  function saveEntry(e) {
    const saveInd = e.target.dataset.save;
    const newData = [trainLineEdit, routeEdit, runNumberEdit, operatorIDEdit];
    const newList = [...tableData];
    newList[saveInd] = newData;
    setTableData(newList);
    setEdit(new Array(edit.length).fill(false));
  }
  function deleteEntry(e) {
    const rInd = e.target.dataset.remove;
    const newList = [...tableData];
    newList.splice(rInd, 1);
    setTableData(newList);
  }
  function addEntry(e) {
    let newEntry = [trainLine, route, runNumber, operatorID];
    let newData = [...tableData];
    newData.push(newEntry);
    setTableData(newData);
    setNewEntry(false);
  }

  useEffect(() => {
    //separating rows
    let uniqueSet = new Set();
    let data = csv
      .split("\r\n")
      .slice(1)
      .map((row) => row.split(","))
      //make sure that all of them have 4 entries and check for uniqueness
      .filter((l) => {
        if (uniqueSet.has(l.join(","))) return false;
        uniqueSet.add(l.join(","));
        return l.length === 4;
      });
    if (sortType === "Train Line") {
      data.sort((a, b) => a[0].localeCompare(b[0]));
    } else if (sortType === "Route") {
      data.sort((a, b) => a[1].localeCompare(b[1]));
    } else if (sortType === "Run Number") {
      data.sort((a, b) => a[2].localeCompare(b[2]));
    } else if (sortType === "Operator ID") {
      data.sort((a, b) => a[3].localeCompare(b[3]));
    }
    setTableData(data);
  }, [sortType, csv]);
  return (
    <div id="dataDisplay">
      <div id="sort">
        {" "}
        Sort by:
        <select onChange={(e) => setSortType(e.target.value)} name="sortby">
          <option value="Train Line">Train Line</option>
          <option value="Route">Route</option>
          <option value="Run Number">Run Number</option>
          <option value="Operator ID">Operator ID</option>
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th className="header">Train Line</th>
            <th className="header">Route</th>
            <th className="header">Run Number</th>
            <th className="header">Operator ID</th>
            <th id="pageContainer">
              <button onClick={(e) => setPage(page - 1 < 0 ? 0 : page - 1)}>
                {String("<")}
              </button>
              <p>{page + 1}</p>
              <button
                onClick={(e) =>
                  setPage(
                    Math.abs(page + 1) <= Math.floor(tableData.length / 5)
                      ? Math.abs(page + 1)
                      : page
                  )
                }
              >
                {String(">")}
              </button>
            </th>
          </tr>
          {tableData.map((row, i) =>
            i >= page * 5 && i < (page + 1) * 5 ? (
              edit[i] ? (
                <tr key={"row" + i}>
                  {row.map((col, j) => (
                    <>
                      <th key={"col" + i + j}>
                        {" "}
                        <input
                          className="editInput"
                          placeholder={col}
                          data-editrow={String(j)}
                          type="text"
                          onChange={(e) => setRow(e)}
                        ></input>
                      </th>
                    </>
                  ))}
                  <button
                    className="save"
                    data-save={String(i)}
                    key={"ed" + i}
                    onClick={(e) => saveEntry(e)}
                  >
                    Save
                  </button>
                </tr>
              ) : (
                <tr key={"rows" + i}>
                  {row.map((col, i) => (
                    <>
                      <th key={"cols" + i}>{col}</th>
                    </>
                  ))}
                  <button
                    className="edit"
                    data-edit={String(i)}
                    key={"ed" + i}
                    onClick={(e) => editEntry(e)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    key={"del" + i}
                    data-remove={String(i)}
                    onClick={(e) => deleteEntry(e)}
                  >
                    Delete
                  </button>
                </tr>
              )
            ) : (
              ""
            )
          )}
        </tbody>
      </table>
      {newEntry ? (
        <div id="newEntryWrapper">
          <label htmlFor="name"></label>
          <input
            placeholder="Train Line"
            type="text"
            onChange={(e) => setTrainLine(e.target.value)}
          ></input>
          <label htmlFor="name"></label>
          <input
            placeholder="Route"
            type="text"
            onChange={(e) => setRoute(e.target.value)}
          ></input>
          <label htmlFor="name"></label>
          <input
            placeholder="Run Number"
            type="text"
            onChange={(e) => setRunNumber(e.target.value)}
          ></input>
          <label htmlFor="name"></label>
          <input
            placeholder="Operator ID"
            type="text"
            onChange={(e) => setOperatorID(e.target.value)}
          ></input>
          <button id="finished" onClick={(e) => addEntry(e)}>
            Finished!
          </button>
        </div>
      ) : (
        <button onClick={(e) => setNewEntry(true)}>Add Entry</button>
      )}
      <DownloadData data={tableData} />
    </div>
  );
};

export default DataDisplay;
