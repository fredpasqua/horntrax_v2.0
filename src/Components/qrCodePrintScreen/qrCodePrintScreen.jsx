import { useState } from "react";
import QRcodeGenerator from "../../QRcodeGenerator";
import "./qrCodePrintScreen.scss";

function QrCodePrintScreen({ filteredInstruments }) {
  const [isVisible, setIsVisible] = useState(false);

  async function handleOnClick() {
    const html2pdf = await require("html2pdf.js");
    const element = document.querySelector("#qrCodeScreen");
    const opt = {
      filename: "HornTraxQRCodes.pdf",
    };
    html2pdf(element, opt);
  }
  return (
    <>
      <ul class="objectSelectorList">
        <li class="text">
          <button
            className="selButton selectorButtonA"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            Show/Hide QR Codes
          </button>
        </li>

        <li class="text">
          <button
            className="selButton selectorButtonC"
            onClick={() => {
              handleOnClick();
            }}
            style={
              isVisible === false
                ? { display: "none" }
                : {
                    display: "inline-block",
                  }
            }
          >
            Print Codes
          </button>
        </li>
      </ul>

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
