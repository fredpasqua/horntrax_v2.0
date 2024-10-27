import { useState } from "react";
import QRcodeGenerator from "../../QRcodeGenerator";
import "./qrCodePrintScreen.css";
function QrCodePrintScreen({ filteredInstruments }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <div>
        <button
          style={{ width: "100px" }}
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          GET QR CODES
        </button>
      </div>

      <div
        className="qrCodeContainer"
        style={
          isVisible === false
            ? { display: "none" }
            : {
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
                flexWrap: "wrap",
              }
        }
      >
        {filteredInstruments?.map((item) => (
          <QRcodeGenerator barcode={item.barcode} key={item.barcode} />
        ))}
      </div>
    </>
  );
}

export default QrCodePrintScreen;
