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
    else if (event.target.name === "dropdown-customer") {
      this.getCustomers(event.target.value);
    } else {
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
  getCustomers = (stateName) => {
    const name = stateName;
    Axios.post("http://localhost:5000/customers", { stateName: name }).then(
      (response) => {
        this.setState({
          customerList: response.data,
        });
      }
    );
  };
  render() {
    const { option, stateList, customerList } = this.state;

    this.getStates();
    return (
      <div>
        <div className="customer-container">
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
          <div style={{ marginTop: "10px" }}>
            {customerList.length != 0 && (
              <div className="customer-box">
                <label id="item1">cID</label>
                <label id="item2">name</label>
                <label id="item3">street</label>
                <label id="item4">city</label>
                <label id="item5">stateAb</label>
                <label id="item6">zipcode</label>
              </div>
            )}
            {this.state.customerList.map((val) => {
              return (
                <div className="customer-box">
                  <label id="item1" className="customer-label">
                    {val.cID}
                  </label>
                  <label id="item2" className="customer-label">
                    {val.name}
                  </label>
                  <label id="item3" className="customer-label">
                    {val.street}
                  </label>
                  <label id="item4" className="customer-label">
                    {val.city}
                  </label>
                  <label id="item5" className="customer-label">
                    {val.stateAb}
                  </label>
                  <label id="item6" className="customer-label">
                    {val.zipcode}
                  </label>
                </div>
              );
            })}
          </div>
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
