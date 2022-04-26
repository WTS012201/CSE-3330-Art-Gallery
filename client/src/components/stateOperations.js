import React from "react";
import "../App.css";
let InsertState = (props) => (
  <div className="information">
    <label style={{ marginTop: "10px" }}>State Name: </label>
    <input
      className="state-info"
      type="text"
      value={props.stateName}
      name="stateName"
      onChange={props.handleChange}
    />
    <label style={{ marginTop: "10px" }}>State Abbreviation: </label>
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
let UpdateState = (props) => (
  <div className="information">
    <label style={{ marginTop: "10px" }}>Select State: </label>
    <select
      className="dropdown"
      name="dropdown-state"
      value={props.option3}
      onChange={props.handleChange}
    >
      <option hidden selected>
        State
      </option>
      {props.stateList.map((val) => {
        return <option value={val.stateName}>{val.stateName}</option>;
      })}
    </select>
    <label style={{ marginTop: "10px" }}>New State Name: </label>
    <input
      className="state-info"
      type="text"
      value={props.stateName}
      name="stateName"
      onChange={props.handleChange}
    />
    <label style={{ marginTop: "10px" }}>New State Abbreviation: </label>
    <input
      className="state-info"
      type="text"
      value={props.stateAb}
      name="stateAb"
      onChange={props.handleChange}
    />
    <button style={{ fontSize: "20px" }} onClick={props.updateState}>
      Update state
    </button>
  </div>
);
let DeleteState = (props) => (
  <div className="information">
    <label style={{ marginTop: "10px" }}>Select State: </label>
    <select
      className="dropdown"
      name="dropdown-state-delete"
      value={props.option3}
      onChange={(event) => {
        props.handleChange(event);
      }}
    >
      <option hidden selected>
        State
      </option>
      {props.stateList.map((val) => {
        return <option value={val.stateName}>{val.stateName}</option>;
      })}
    </select>
  </div>
);
export { InsertState, UpdateState, DeleteState };
