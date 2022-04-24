import React from "react";
import Axios from "axios";
import "../App.css";

export default class State extends React.Component {
  state = {
    stateName: "",
    stateAb: "",
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  addState = () => {
    Axios.post("http://localhost:5000/create", {
      stateName: this.state.stateName,
      stateAb: this.state.stateAb,
    }).then(() => {
      console.log("success");
    });
  };
  getStates = () => {
    Axios.get("http://localhost:5000/states").then((response) => {
      console.log(response);
    });
  };
  displayInfo = () => {
    console.log(this.state.stateName + this.state.stateAb);
  };
  render() {
    return (
      <div className="information">
        <label>State Name: </label>
        <input type="text" name="stateName" onChange={this.handleChange} />
        <label>State Abbreviation: </label>
        <input type="text" name="stateAb" onChange={this.handleChange} />
        <button onClick={this.addState}>Add state</button>
        <button onClick={this.getStates}>Get states</button>
      </div>
    );
  }
}
