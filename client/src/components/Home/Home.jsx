import React, { Component } from "react";
import Board from "./Board";
import Bbishop from "../../icons/bishop.svg";
import Bking from "../../icons/king.svg";
import Bknight from "../../icons/knight.svg";
import Bpawn from "../../icons/pawn.svg";
import Bqueen from "../../icons/queen.svg";
import Brook from "../../icons/rook.svg";
import Wbishop from "../../icons/Wbishop.svg";
import Wknight from "../../icons/Wknight.svg";
import Wking from "../../icons/Wking.svg";
import Wpawn from "../../icons/Wpawn.svg";
import Wqueen from "../../icons/Wqueen.svg";
import Wrook from "../../icons/Wrook.svg";
import "./Home.css";

export default class Home extends Component {
  state = {
    pieces: [
      { id: 1, name: "White Rook", img: Wrook, tile: "A1" },
      { id: 2, name: "White Rook", img: Wrook, tile: "H1" },
      { id: 3, name: "White Knight", img: Wknight, tile: "B1" },
      { id: 4, name: "White Knight", img: Wknight, tile: "G1" },
      { id: 5, name: "White Bishop", img: Wbishop, tile: "C1" },
      { id: 6, name: "White Bishop", img: Wbishop, tile: "F1" },
      { id: 7, name: "White King", img: Wking, tile: "D1" },
      { id: 8, name: "White Queen", img: Wqueen, tile: "E1" },
      { id: 9, name: "White Pawn", img: Wpawn, tile: "A2" },
      { id: 10, name: "White Pawn", img: Wpawn, tile: "B2" },
      { id: 11, name: "White Pawn", img: Wpawn, tile: "C2" },
      { id: 12, name: "White Pawn", img: Wpawn, tile: "D2" },
      { id: 13, name: "White Pawn", img: Wpawn, tile: "E2" },
      { id: 14, name: "White Pawn", img: Wpawn, tile: "F2" },
      { id: 15, name: "White Pawn", img: Wpawn, tile: "G2" },
      { id: 16, name: "White Pawn", img: Wpawn, tile: "H2" },
      { id: 17, name: "Black Rook", img: Brook, tile: "A8" },
      { id: 18, name: "Black Rook", img: Brook, tile: "H8" },
      { id: 19, name: "Black Knight", img: Bknight, tile: "B8" },
      { id: 20, name: "Black Knight", img: Bknight, tile: "G8" },
      { id: 21, name: "Black Bishop", img: Bbishop, tile: "C8" },
      { id: 22, name: "Black Bishop", img: Bbishop, tile: "F8" },
      { id: 23, name: "Black King", img: Bking, tile: "D8" },
      { id: 24, name: "Black Queen", img: Bqueen, tile: "E8" },
      { id: 25, name: "Black Pawn", img: Bpawn, tile: "A7" },
      { id: 26, name: "Black Pawn", img: Bpawn, tile: "B7" },
      { id: 27, name: "Black Pawn", img: Bpawn, tile: "C7" },
      { id: 28, name: "Black Pawn", img: Bpawn, tile: "D7" },
      { id: 29, name: "Black Pawn", img: Bpawn, tile: "E7" },
      { id: 30, name: "Black Pawn", img: Bpawn, tile: "F7" },
      { id: 31, name: "Black Pawn", img: Bpawn, tile: "G7" },
      { id: 32, name: "Black Pawn", img: Bpawn, tile: "H7" },
    ],
  };

  render() {
    return (
      <div className="Home">
        <Board reverse={false} p={this.state.pieces}/>

      </div>
    );
  }
}
