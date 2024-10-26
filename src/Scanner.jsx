import React from "react";
import { useState } from "react";
import { BarcodeScanner } from "@thewirv/react-barcode-scanner";

export default function Scanner() {
  const [data, setData] = useState("No result");

  return (
    <>
      <BarcodeScanner
        doScan={true}
        onSuccess={(text) => setData(text)}
        onError={(error) => {
          if (error) {
            console.error(error.message);
          }
        }}
        onLoad={() => console.log("Video feed has loaded!")}
        containerStyle={{ width: "30%" }}
      />
      <p>{data}</p>
    </>
  );
}
