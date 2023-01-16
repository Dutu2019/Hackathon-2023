import React, { Component, useEffect, useState } from "react";
import "./Board.css";

export default class Board extends Component {
  state = {
    rowLetters: {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
      4: "E",
      5: "F",
      6: "G",
      7: "H",
    },
  };

  createBoard() {
    let rows = []
    for (let i = 0; i < 8; i++) {
      let tiles = [];
      for (let j = 0; j < 8; j++) {
        let color;
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            color = "white";
          } else {
            color = "green";
          }
        } else {
          if (j % 2 === 0) {
            color = "green";
          } else {
            color = "white";
          }
        }
        const tile = (
          <div
            className={`tile ${color} ${this.state.rowLetters[j]}${8 - i}`}
          ></div>
        );
        tiles.push(tile)
      }
      const row = (
        <div className="row">
          {tiles.map((tile) => {
            return tile;
          })}
        </div>
      );
      rows.push(row);
      tiles = []
    }
    const board = (
      <div className="board">
        {rows.map((row) => {
          return row;
        })}
      </div>
    );
    return board;
  }

  render() {
    return <div className="board-container">{this.createBoard()}</div>;
  }
}
