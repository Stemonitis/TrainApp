import React, { useState, useEffect } from "react";
import initialData from "./initialData.js";
import DataDisplay from "./DataDisplay.js";
import "./Main.css";
export default function Main() {
  const reader = new FileReader();
  const [CSV, setCSV] = useState(initialData);

  function ready(e) {
    setCSV(reader.result);
  }
  function handleCSV(file) {
    reader.onloadend = ready;
    reader.readAsText(file);
  }

  return (
    <>
      <img src="https://cdn.shopify.com/s/files/1/0048/1702/products/illinois-central2_1200x1200.jpg?v=1573322259"></img>
      <main>
        <h1>Chicago Trains</h1>
        <label htmlFor="upload" className="fileUpload">
          Upload your .csv file below:
          <br></br>
          <input
            className="upload"
            type="file"
            accept=".csv"
            onChange={(e) => handleCSV(e.target.files[0])}
          ></input>
        </label>
        <br></br>
        <DataDisplay csv={CSV} />
      </main>
    </>
  );
}
