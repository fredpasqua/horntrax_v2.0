import React from "react";
import { useState } from "react";
import { BarcodeScanner } from "@thewirv/react-barcode-scanner";

export default function Scanner({ handleScan }) {
  const [data, setData] = useState([]);
  const [doScan, setDoScan] = useState(false);
  return (
    <>
      <BarcodeScanner
        doScan={doScan}
        onSuccess={(text) => setData(text)}
        onError={(error) => {
          if (error) {
            console.error(error.message);
          }
        }}
        onLoad={() => console.log("Video feed has loaded!")}
        containerStyle={{ maxWidth: "10%", minWidth: "200px" }}
      />
      <button onClick={() => setDoScan(true)}>SCAN</button>
      <button onClick={() => handleScan(data) && setDoScan(false)}>
        Find This: {data}
      </button>
    </>
  );
}
