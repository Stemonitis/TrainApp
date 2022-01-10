import React from "react";

const DownloadData = (props) => {
  function downloadCSV() {
    let csvFile, downloadLink;
    const csv = props.data.map((l) => l.join(",")).join("\n\r");
    if (
      window.Blob == undefined ||
      window.URL == undefined ||
      window.URL.createObjectURL == undefined
    ) {
      alert("Your browser doesn't support Blobs");
      return;
    }
    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = "TrainData.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  return (
    <button id="download" onClick={(e) => downloadCSV(e)}>
      Download Data as .csv
    </button>
  );
};

export default DownloadData;
