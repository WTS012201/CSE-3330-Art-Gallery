import "./App.css";
import React, { Component } from "react";
import State from "./components/State";
class App extends Component {
  state = {
    view: "state",
  };
  render() {
    const { view } = this.state;
    return <div className="App">{view === "state" && <State />}</div>;
  }
}

export default App;
