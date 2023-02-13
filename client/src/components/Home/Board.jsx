import React from "react";
import Tile from "./Tile";
import Piece from "./Piece";

export default function Board({ reverse, pos, handleMove }) {
  const position = pos
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

  // Renders the board
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
                    className={`tile ${(i + j) % 2 === 0 ? "white" : "green"}`}
                    moveTo={handleMove}
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
