import React, { Component } from "react";
import Board from "./Board";
import PlayButton from "./PlayButton";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Board reverse={false} />
        <PlayButton />
      </div>
    );
  }
}
