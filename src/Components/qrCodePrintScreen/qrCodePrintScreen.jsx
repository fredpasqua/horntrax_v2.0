import { useState } from "react";
import QRcodeGenerator from "../../QRcodeGenerator";
import "./qrCodePrintScreen.css";
function QrCodePrintScreen({ filteredInstruments }) {
  const [isVisible, setIsVisible] = useState(false);

  async function handleOnClick() {
    const html2pdf = await require("html2pdf.js");
    const element = document.querySelector("#qrCodeScreen");
    html2pdf(element, {});
  }
  return (
    <>
      <div className="qrCodeButtons">
        <button
          className="button"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          GET QR CODES
        </button>
        <button
          className="button"
          onClick={() => {
            handleOnClick();
          }}
        >
          GET A PDF
        </button>
      </div>

      <div
        className="qrCodeContainer"
        id="qrCodeScreen"
        style={
          isVisible === false
            ? { display: "none" }
            : {
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
                flexWrap: "wrap",
                gap: "20px",
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
