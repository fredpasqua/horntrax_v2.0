import React from "react";

import QRCode from "react-qr-code";

function QRcodeGenerator({ barcode }) {
  return (
    <div className="flexer">
      <QRCode
        size={256}
        style={{
          height: "100px",
          maxWidth: "100px",
          width: "100px",
          margin: "20px",
        }}
        value={barcode.toString()}
        viewBox={`0 0 256 256`}
      />
      <p>{barcode}</p>
    </div>
  );
}
export default QRcodeGenerator;
