import React, { useEffect } from "react";
import "./Board.css";

export default function Board() {
  useEffect(() => {
    // Create board
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

    console.log(rowLetters[0]);

    const board = document.querySelector(".board");
    for (let i = 0; i < 8; i++) {
      const row = document.createElement("div");
      row.classList = "row";

      for (let j = 0; j < 8; j++) {
        const tile = document.createElement("div");

        if (i % 2 == 0) {
          if (j % 2 == 0) {
            tile.classList = "tile white";
          } else {
            tile.classList = "tile green";
          }
        } else {
          if (j % 2 == 0) {
            tile.classList = "tile green";
          } else {
            tile.classList = "tile white";
          }
        }
        // Create coords
        tile.classList += ` ${rowLetters[j]}${8 - i}`;
        row.appendChild(tile);
      }
      board.appendChild(row);
    }
  }, []);

  return (
    <div className="board-container">
      <div className="board"></div>
    </div>
  );
}
