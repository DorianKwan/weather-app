import { Nav } from "../nav/nav";
import "./App.css";
import React from "react";

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav apiKey={this.props.apiKey} />
      </div>
    );
  }
}
