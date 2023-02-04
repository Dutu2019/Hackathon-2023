import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import Piece from "./Piece";
import "./Board.css";

export default function Board({ reverse }) {
  const [position, setPosition] = useState([
    { id: 1, name: "rook", color: "W", tile: "A1" },
    { id: 2, name: "rook", color: "W", tile: "H1" },
    { id: 3, name: "knight", color: "W", tile: "B1" },
    { id: 4, name: "knight", color: "W", tile: "G1" },
    { id: 5, name: "bishop", color: "W", tile: "C1" },
    { id: 6, name: "bishop", color: "W", tile: "F1" },
    { id: 7, name: "king", color: "W", tile: "D1" },
    { id: 8, name: "queen", color: "W", tile: "E1" },
    { id: 9, name: "pawn", color: "W", tile: "A2" },
    { id: 10, name: "pawn", color: "W", tile: "B2" },
    { id: 11, name: "pawn", color: "W", tile: "C2" },
    { id: 12, name: "pawn", color: "W", tile: "D2" },
    { id: 13, name: "pawn", color: "W", tile: "E2" },
    { id: 14, name: "pawn", color: "W", tile: "F2" },
    { id: 15, name: "pawn", color: "W", tile: "G2" },
    { id: 16, name: "pawn", color: "W", tile: "H2" },
    { id: 17, name: "rook", color: "B", tile: "A8" },
    { id: 18, name: "rook", color: "B", tile: "H8" },
    { id: 19, name: "knight", color: "B", tile: "B8" },
    { id: 20, name: "knight", color: "B", tile: "G8" },
    { id: 21, name: "bishop", color: "B", tile: "C8" },
    { id: 22, name: "bishop", color: "B", tile: "F8" },
    { id: 23, name: "king", color: "B", tile: "D8" },
    { id: 24, name: "queen", color: "B", tile: "E8" },
    { id: 25, name: "pawn", color: "B", tile: "A7" },
    { id: 26, name: "pawn", color: "B", tile: "B7" },
    { id: 27, name: "pawn", color: "B", tile: "C7" },
    { id: 28, name: "pawn", color: "B", tile: "D7" },
    { id: 29, name: "pawn", color: "B", tile: "E7" },
    { id: 30, name: "pawn", color: "B", tile: "F7" },
    { id: 31, name: "pawn", color: "B", tile: "G7" },
    { id: 32, name: "pawn", color: "B", tile: "H7" },
  ]);
  const rowLetters = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
  };

  useEffect(() => {
    function getPosition() {
      fetch("http://10.2.10.51:3001/getPosition", {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => setPosition(data));
    }
  }, []);

  function createBoard() {
    const board = (
      <div className="board">
        {[...Array(8)].map((row, i) => {
          return (
            <div className="row" key={i}>
              {[...Array(8)].map((tile, j) => {
                let coords = reverse
                  ? `${rowLetters[7 - j]}${i + 1}`
                  : `${rowLetters[j]}${8 - i}`;
                const div = (
                  <Tile
                    key={j}
                    id={coords}
                    className={`tile ${(i + j) % 2 === 0 ? "green" : "white"}`}
                  >
                    {position
                      .filter((piece) => {
                        return piece.tile === coords;
                      })
                      .map((piece) => {
                        return (
                          <Piece
                            id={piece.id}
                            key={piece.id}
                            coords={piece.tile}
                            type={{ name: piece.name, color: piece.color }}
                          />
                        );
                      })}
                  </Tile>
                );
                return div;
              })}
            </div>
          );
        })}
      </div>
    );
    return board;
  }

  return <div className="board-container">{createBoard()}</div>;
}
