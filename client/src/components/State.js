import React from "react";
import Axios from "axios";
import "../App.css";
import { InsertState, UpdateState, DeleteState } from "./stateOperations";
export default class State extends React.Component {
  state = {
    option1: "Operation",
    option2: "State",
    option3: "State",
    stateName: "",
    stateAb: "",
    customerList: [],
    stateList: [],
  };
  handleChange = (event) => {
    if (event.target.name === "dropdown-operation")
      this.setState({
        stateName: "",
        stateAb: "",
        option1: event.target.value,
      });
    else if (event.target.name === "dropdown-customer") {
      this.setState({
        option2: event.target.value,
      });
      this.getCustomers(event.target.value);
    } else if (event.target.name === "dropdown-state") {
      this.setState({
        option3: event.target.value,
        stateName: event.target.value,
        stateAb: this.state.stateList.find((val) => {
          return val.stateName === event.target.value;
        }).stateAb,
      });
    } else if (event.target.name === "dropdown-state-delete") {
      this.deleteState(event.target.value);
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };
  updateState = () => {
    const { option3, stateName, stateAb } = this.state;
    Axios.post("http://localhost:5000/update", {
      stateName: stateName,
      stateAb: stateAb,
      option: option3,
    })
      .then(this.getStates)
      .then(() => {
        if (this.state.option2 === option3) {
          this.getCustomers(stateName);
        }
        this.setState({
          stateName: "",
          stateAb: "",
          option3: "",
        });
      });
  };
  addState = () => {
    const { stateName, stateAb } = this.state;
    Axios.post("http://localhost:5000/create", {
      stateName: stateName,
      stateAb: stateAb,
    })
      .then(this.getStates)
      .then(() => {
        console.log("success");
      });
    this.getStates();
    this.setState({
      stateName: "",
      stateAb: "",
    });
  };
  deleteState = (stateName) => {
    Axios.post("http://localhost:5000/delete", {
      stateName: stateName,
    })
      .then(this.getStates)
      .then(() => {
        console.log("success");
      });
    this.getStates();
    this.setState({
      option3: "",
    });
  };
  getStates = () => {
    return Axios.get("http://localhost:5000/states").then((response) => {
      this.setState({
        stateList: response.data,
      });
    });
  };
  getCustomers = (stateName) => {
    const name = stateName;
    Axios.post("http://localhost:5000/customers", { stateName: name }).then(
      (response) => {
        console.log(response.data);
        this.setState({
          customerList: response.data,
        });
      }
    );
  };
  render() {
    const { option1, option2, option3, stateList, customerList } = this.state;
    if (!stateList.length) this.getStates();
    return (
      <div>
        <div className="customer-container">
          <label style={{ paddingRight: "10px", paddingLeft: "10px" }}>
            Customer information by state:
          </label>
          <select
            className="dropdown"
            name="dropdown-customer"
            value={option2}
            onChange={this.handleChange}
          >
            <option hidden selected>
              State
            </option>
            {stateList.map((val) => {
              return <option value={val.stateName}>{val.stateName}</option>;
            })}
          </select>
          <div style={{ marginTop: "10px", padding: "10px" }}>
            {customerList.length !== 0 && (
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
          <div style={{ paddingBottom: "10px" }}>
            <label
              style={{
                paddingRight: "10px",
                paddingLeft: "10px",
                fontSize: "20px",
              }}
            >
              State operation:
            </label>
            <select
              className="dropdown"
              name="dropdown-operation"
              value={option1}
              onChange={this.handleChange}
            >
              <option hidden selected>
                Operation
              </option>
              <option value="insert">insert</option>
              <option value="update">update</option>
              <option value="delete">delete</option>
            </select>
          </div>
          {option1 === "insert" && (
            <InsertState
              stateName={this.state.stateName}
              stateAb={this.state.stateAb}
              handleChange={this.handleChange}
              addState={this.addState}
            />
          )}
          {option1 === "update" && (
            <UpdateState
              stateName={this.state.stateName}
              stateAb={this.state.stateAb}
              option3={option3}
              stateList={stateList}
              handleChange={this.handleChange}
              updateState={this.updateState}
            />
          )}
          {option1 === "delete" && (
            <DeleteState
              stateName={this.state.stateName}
              option3={option3}
              stateList={stateList}
              handleChange={this.handleChange}
              deleteState={this.deleteState}
            />
          )}
        </div>
      </div>
    );
  }
}
