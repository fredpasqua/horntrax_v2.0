import React from 'react'
import "./spinner.css";
export default function Spinner() {
  return (
    <>
      {" "}
      <div class="custom-loader"></div>
      <p class="custom-loader-message">waiting for instruments...</p>
    </>
  );
}
