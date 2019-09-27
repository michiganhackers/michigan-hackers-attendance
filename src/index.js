import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import Table from "./Table.js";
import {
  parseDataDetails,
  parseData,
  getUserData,
  getAttendanceData
} from "../dataparse.js";

/** Modal component.
 * Displays data grabbed from dataparse.js
 * Uses Table component from src/Table.js
 * */
function Modal({
  name,
  showButton,
  style,
  defaultStyle,
  modalBackgroundStyle,
  modalContentStyle,
  buttonStyle
}) {
  // <Table title="User Stats" data={getData()["userMap"]} />
  const [clicked, click] = useState(false);
  const [content, setContent] = useState(
    <Table title="Add Data To Create Table" />
  );

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

  function parseTextArea(type) {
    const eventCSV = document.getElementById("eventTextarea").value;
    const userCSV = document.getElementById("userTextarea").value;
    const { eventMap, userMap } = parseData(eventCSV);
    setContent(
      <Table
        title={type + " Stats"}
        data={
          parseDataDetails(userCSV, eventMap, userMap)[
            type.toLocaleLowerCase() + "Map"
          ]
        }
      />
    );
  }

  function setTextArea(user = "", attendance = "") {
    const eventCSV = document.getElementById("eventTextarea");
    const userCSV = document.getElementById("userTextarea");
    userCSV.value = user;
    userCSV.innerHTML = user;
    eventCSV.value = attendance;
    eventCSV.innerHTML = attendance;
  }

  return (
    <Fragment>
      {/* Regular header */}
      <div style={{ display: "block", padding: 8, marginLeft: 20 }}>
        {showButton ? (
          <button
            onClick={() => click(!clicked)}
            style={{ ...buttonStyle, position: "absolute", margin: -5 }}
            children={name}
          />
        ) : (
          <Fragment>
            <button
              style={buttonStyle}
              onClick={() => {
                setContent(
                  <Table
                    title="Event Stats"
                    data={parseDataDetails()["eventMap"]}
                  />
                );
              }}
              children="Event Data Test"
            />

            <button
              style={buttonStyle}
              onClick={() => {
                setContent(
                  <Table
                    title="User Stats"
                    data={parseDataDetails()["userMap"]}
                  />
                );
              }}
              children="User Data Test"
            />
          </Fragment>
        )}
      </div>
      {/* Regular content */}
      <div children={content} style={{ ...defaultStyle, ...style }} id={name} />

      {/* Modal */}
      <div id={name + "Modal"} style={modalBackgroundStyle}>
        {/* Header inside modal */}
        <div
          style={{
            ...modalContentStyle,
            display: "block",
            padding: 15,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }}
        >
          <h2
            children={
              <Fragment>
                <button
                  onClick={() => click(!clicked)}
                  style={{
                    ...buttonStyle,
                    float: "right",
                    margin: -5,
                    marginTop: -20
                  }}
                  children={`Close`}
                />{" "}
                {name}
              </Fragment>
            }
          />
        </div>
        {/* Content inside modal */}
        <div
          id={name + "ModalContent"}
          style={{ ...modalContentStyle, marginBottom: 200, paddingTop: 0 }}
        >
          <button
            style={buttonStyle}
            onClick={() => parseTextArea("Event")}
            children="View Event Data with Current Input"
          />
          <button
            style={buttonStyle}
            onClick={() => parseTextArea("User")}
            children="View User Data with Current Input"
          />
          <button
            style={buttonStyle}
            onClick={() => setTextArea(getUserData(), getAttendanceData())}
            children="Set to Example CSV input"
          />
          <button
            style={buttonStyle}
            onClick={() => {
              setTextArea();
              setContent(<Table title="Add Data To Create Table" />);
            }}
            children="Clear"
          />
          <h3 children="User Data Input" />
          <textarea
            id="userTextarea"
            style={{
              margin: "3.4%",
              marginTop: 0,
              width: "92%",
              minHeight: 200
            }}
          />
          <h3 children="Event Data Input" />
          <textarea
            id="eventTextarea"
            style={{
              margin: "3.4%",
              marginTop: 0,
              width: "92%",
              minHeight: 200
            }}
          />
        </div>
      </div>
    </Fragment>
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
    padding: "15px",
    width: "90%",
    overflow: "auto"
  },
  defaultStyle: {
    overflow: "auto"
  },
  buttonStyle: {
    backgroundColor: "white",
    margin: 10,
    padding: 7,
    color: "#F15D24",
    border: "1px solid #F15D24",
    cursor: "pointer",
    borderRadius: 6
  },
  // variable for when content doesn't need to
  // be shown because its empty due to toggles
  showButton: true
};

function checkData() {
  /*
  function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
} */
}

ReactDOM.render(
  <Modal name="Add Your Data" showButton />,
  document.getElementById("app")
);

// <Table title="User Stats" data={getData()["userMap"]} />
