import React, { useState, useEffect, Fragment } from "react";

/** Modal component.
 * Displays data grabbed from dataparse.js
 * Uses Table component from src/Table.js
 * */
function Modal({
  name,
  header,
  content,
  modalBackgroundStyle,
  modalHeaderStyle,
  modalContentStyle,
  click,
  clicked
}) {
  // Hide or show the modal depending on user input, such as button press or
  // clicking outside of the modal
  useEffect(() => {
    document.getElementById(name + "Modal").style.display = clicked
      ? "block"
      : "none";
  });

  // If the modal is open and the user clicks outside of the content, close the modal
  useEffect(() => {
    function windowClick(event) {
      if (clicked && event.target.id === name + "Modal") click(!clicked);
    }
    window.addEventListener("click", windowClick);
    return () => window.removeEventListener("click", windowClick);
  });

  return (
    <div id={name + "Modal"} style={modalBackgroundStyle}>
      <div style={modalHeaderStyle}>{header}</div>
      <div style={modalContentStyle}>{content}</div>
    </div>
  );
}
Modal.defaultProps = {
  // the black overlay effect for the modal
  modalBackgroundStyle: {
    display: "none",
    position: "fixed",
    zIndex: 1,
    paddingTop: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  // the white container for the modal
  modalContentStyle: {
    zIndex: 2,
    backgroundColor: "#fefefe",
    margin: "auto",
    marginBottom: 200,
    padding: "15px",
    paddingTop: 0,
    width: "90%",
    overflow: "auto"
  },
  // the white container for the modal
  modalHeaderStyle: {
    zIndex: 2,
    backgroundColor: "#fefefe",
    width: "90%",
    overflow: "auto",
    margin: "auto",
    padding: 15,
    display: "block",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
};
