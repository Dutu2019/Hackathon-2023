import React, { Component } from "react";
import Board from "./Board";
import "./Home.css";

export default class Home extends Component {

  render() {
    return (
      <div className="Home">
        <Board reverse={false}/>

      </div>
    );
  }
}
