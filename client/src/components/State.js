import React from "react";
import Axios from "axios";
import "../App.css";
import InsertState from "./InsertState";
export default class State extends React.Component {
  state = {
    option: "insert",
    stateName: "",
    stateAb: "",
    stateList: [],
  };
  handleChange = (event) => {
    if (event.target.name === "dropdown")
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
    Axios.post("http://localhost:5000/create", {
      stateName: this.state.stateName,
      stateAb: this.state.stateAb,
    }).then(() => {
      console.log("success");
    });
    this.setState({ stateName: "", stateAb: "", stateList: [] });
  };
  getStates = () => {
    Axios.get("http://localhost:5000/states").then((response) => {
      this.setState({
        stateName: this.stateName,
        stateAb: this.stateAb,
        stateList: response.data,
      });
    });
  };
  displayInfo = () => {
    console.log(this.state.stateName + this.state.stateAb);
  };
  render() {
    const { option } = this.state;
    return (
      <div className="information">
        <select
          className="dropdown"
          name="dropdown"
          value={option}
          onChange={this.handleChange}
        >
          <option value="insert">insert</option>
          <option value="update">update</option>
          <option value="delete">delete</option>
        </select>
        {option === "insert" && (
          <InsertState
            stateName={this.state.stateName}
            stateAb={this.state.stateAb}
            handleChange={this.handleChange}
            addState={this.addState}
          />
        )}
        <button onClick={this.getStates}>Get states</button>
        {this.state.stateList.map((val) => {
          return <div>{val.stateName}</div>;
        })}
      </div>
    );
  }
}
