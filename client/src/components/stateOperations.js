import React from "react";
import "../App.css";
let InsertState = (props) => (
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
let UpdateState = (props) => (
  <div>
    <label>Select State: </label>
    <select
      className="dropdown"
      name="dropdown-state"
      value={props.option3}
      onChange={props.handleChange}
    >
      {props.stateList.map((val) => {
        return <option value={val.stateName}>{val.stateName}</option>;
      })}
    </select>
    <label>New State Name: </label>
    <input
      className="state-info"
      type="text"
      value={props.stateName}
      name="stateName"
      onChange={props.handleChange}
    />
    <label>New State Abbreviation: </label>
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
export { InsertState, UpdateState, DeleteState };
