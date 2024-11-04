import React from "react";
import { useState } from "react";
import { BarcodeScanner } from "@thewirv/react-barcode-scanner";
import "./Scanner.css";
export default function Scanner({ handleScan }) {
  const [data, setData] = useState([]);
  const [doScan, setDoScan] = useState(false);
  const [isVisible, setIsVisible] = useState("none");
  return (
    <>
      <div className="scannerWrapper">
        <BarcodeScanner
          doScan={doScan}
          onSuccess={(text) => {
            setIsVisible("inline-block");
            setData(text);
            setDoScan(false);
          }}
          onError={(error) => {
            if (error) {
              alert(error.message);
            }
          }}
          onLoad={() => console.log("Video feed has loaded!")}
          containerStyle={{ maxWidth: "10%", minWidth: "200px" }}
        />
        <div className="scanner">
          <button
            className="scanButtons"
            onClick={() => {
              setDoScan(!doScan);
            }}
          >
            {" "}
            Scanner ON/OFF
          </button>
          <button
            style={{ display: isVisible }}
            className="scanButtons"
            onClick={() => {
              handleScan(data);
              setIsVisible("none");
              setDoScan(false);
            }}
          >
            SEARCH BARCODE: {data}
          </button>
        </div>
      </div>
    </>
  );
}
