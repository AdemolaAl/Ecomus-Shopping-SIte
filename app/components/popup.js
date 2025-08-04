import React from "react";
import { useGlobalState } from "./default2";

export default function Popup() {


  const {state} = useGlobalState();

  const {openPopup, popupMessage , popupType} = state

  if (popupType == "success") {
    return (
      <div className={`popup2 ${openPopup}`}>
        <div className="first">
          <i className="fa-solid fa-check"></i>
        </div>
        <div className="second">
          <p>SUCCESS</p>
          <p>{popupMessage}</p>
        </div>
      </div>
    );
  }
  if (popupType == "error") {
    return (
      <div className={`popup2 ${openPopup}  error`}>
        <div className="first">
         <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="second">
          <p>ERROR</p>
          <p>{popupMessage}</p>
        </div>
      </div>
    );
  }
}
