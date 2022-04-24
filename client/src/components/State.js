import React from "react";
import Axios from "axios";
import "../App.css";
import InsertState from "./InsertState";
export default class State extends React.Component {
  state = {
    option: "insert",
    stateName: "",
    stateAb: "",
    customerList: [],
    stateList: [],
  };
  handleChange = (event) => {
    if (event.target.name === "dropdown-operation")
      this.setState({
        option: event.target.value,
      });
    else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };
  addState = () => {
    const name = this.state.stateName;
    Axios.post("http://localhost:5000/create", {
      stateName: name,
      stateAb: this.state.stateAb,
    }).then(() => {
      console.log("success");
    });
    this.setState({
      stateName: "",
      stateAb: "",
      stateList: [...this.state.stateList, name],
    });
  };
  getStates = () => {
    Axios.get("http://localhost:5000/states").then((response) => {
      this.setState({
        stateList: response.data.map((val) => {
          return val.stateName;
        }),
      });
    });
  };
  render() {
    const { option, stateList } = this.state;

    this.getStates();
    return (
      <div>
        <div className="customer">
          <label style={{ paddingRight: "10px", paddingLeft: "10px" }}>
            Customer information by state:
          </label>
          <select
            className="dropdown"
            name="dropdown-customer"
            value={option}
            onChange={this.handleChange}
          >
            {stateList.map((val) => {
              return <option value={val}>{val}</option>;
            })}
          </select>
        </div>
        <div className="information">
          <div>
            <select
              className="dropdown"
              name="dropdown-operation"
              value={option}
              onChange={this.handleChange}
            >
              <option value="insert">insert</option>
              <option value="update">update</option>
              <option value="delete">delete</option>
            </select>
          </div>
          {option === "insert" && (
            <InsertState
              stateName={this.state.stateName}
              stateAb={this.state.stateAb}
              handleChange={this.handleChange}
              addState={this.addState}
            />
          )}
        </div>
      </div>
    );
  }
}
