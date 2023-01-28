import React, { useState } from "react";
import "./Board.css";

export default function Board({ reverse, p }) {
  const pieces = p
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
                  <div
                    id={coords}
                    key={j}
                    className={`tile ${(i + j) % 2 === 0 ? "green" : "white"}`}
                  >
                    {pieces
                      .filter((piece) => {
                        return piece.tile === coords;
                      })
                      .map((piece) => {
                        return (
                          <img
                            key={piece.id}
                            id={piece.id}
                            src={piece.img}
                            alt=""
                            className="piece"
                          />
                        );
                      })}
                  </div>
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
