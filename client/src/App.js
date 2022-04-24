import "./App.css";
import React, { Component } from "react";
import State from "./components/State";
import Artwork from "./components/Artwork";
class App extends Component {
  state = {
    view: "default",
  };
  onViewChange = (event) => {
    this.setState({
      view: event.target.name,
    });
  };
  render() {
    const { view } = this.state;
    return (
      <div className="App">
        <div className="tabs">
          <button name="state" onClick={this.onViewChange}>
            States
          </button>
          <button name="artwork" onClick={this.onViewChange}>
            Artworks
          </button>
        </div>
        {view === "state" && <State />}
        {view === "state" && <Artwork />}
      </div>
    );
  }
}

export default App;
