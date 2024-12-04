
import React from 'react'
import "./qrCodeStyle.scss";


export default function QrCodeButtons() {
  return (
    <>
      <ul class="objectSelectorList">
        <li class="text">
          <button
          
            class="selButton selectorButtonA"
          >
            Get Codes
          </button>
        </li>

        <li class="text">
          <button class="selButton selectorButtonC">Print Codes</button>
        </li>
      </ul>
    </>
  );
}


