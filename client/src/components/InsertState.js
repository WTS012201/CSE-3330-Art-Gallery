import React from "react";
import "../App.css";
export default (props) => (
  <div>
    <label>State Name: </label>
    <input
      className="state-info"
      type="text"
      value={props.stateName}
      name="stateName"
      onChange={props.handleChange}
    />
    <label>State Abbreviation: </label>
    <input
      className="state-info"
      type="text"
      value={props.stateAb}
      name="stateAb"
      onChange={props.handleChange}
    />
    <button style={{ fontSize: "20px" }} onClick={props.addState}>
      Add state
    </button>
  </div>
);
