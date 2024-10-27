import React from "react";
import { useState } from "react";
import { BarcodeScanner } from "@thewirv/react-barcode-scanner";

export default function Scanner({ handleScan }) {
  const [data, setData] = useState("No result");

  return (
    <>
      <BarcodeScanner
        onSuccess={(text) => setData(text)}
        onError={(error) => {
          if (error) {
            console.error(error.message);
          }
        }}
        onLoad={() => console.log("Video feed has loaded!")}
        containerStyle={{ width: "10%" }}
      />
      <button onClick={() => handleScan(data)}>{data}</button>
    </>
  );
}
