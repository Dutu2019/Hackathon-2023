import React, { Component } from "react";
import Bbishop from "../../icons/bishop.svg";
import Bking from "../../icons/king.svg";
import Bknight from "../../icons/knight.svg";
import Bpawn from "../../icons/pawn.svg";
import Bqueen from "../../icons/queen.svg";
import Brook from "../../icons/rook.svg";
import Wbishop from "../../icons/Wbishop.svg";
import Wking from "../../icons/Wking.svg";
import Wpawn from "../../icons/Wpawn.svg";
import Wqueen from "../../icons/Wqueen.svg";
import Wrook from "../../icons/Wrook.svg";
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
    pieces: {
      Bbishop,
      Bking,
      Bknight,
      Bpawn,
      Bqueen,
      Brook,
      Wbishop,
      Wking,
      Wpawn,
      Wqueen,
      Wrook,
    },
  };

  createBoard() {
    let rows = [];
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
            key={`${this.state.rowLetters[j]}${8 - i}`}
            className={`tile ${color} ${this.state.rowLetters[j]}${8 - i}`}
          ></div>
        );
        tiles.push(tile);
      }
      const row = (
        <div className="row" key={i}>
          {tiles.map((tile) => {
            return tile;
          })}
        </div>
      );
      rows.push(row);
      tiles = [];
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
    return (
      <div className="Board">
        <div className="board-container">{this.createBoard()}</div>
        <img src={this.state.pieces.Bbishop} alt="Black Bishop" />
      </div>
    );
  }
}
