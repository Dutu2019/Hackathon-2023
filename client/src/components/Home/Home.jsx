import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../Contexts/Socket";
import Board from "./Board";
import PlayButton from "./PlayButton";
import "./Home.css";

export default function Home() {
  const socket = useContext(SocketContext);
  const [isPlaying, setIsPlaying] = useState(true);
  const [boardReverse, setBoardReverse] = useState(false)
  const [currPos, setCurrPos] = useState([
    { id: 1, name: "rook", color: "W", tile: "A1" },
    { id: 2, name: "rook", color: "W", tile: "H1" },
    { id: 3, name: "knight", color: "W", tile: "B1" },
    { id: 4, name: "knight", color: "W", tile: "G1" },
    { id: 5, name: "bishop", color: "W", tile: "C1" },
    { id: 6, name: "bishop", color: "W", tile: "F1" },
    { id: 7, name: "king", color: "W", tile: "E1" },
    { id: 8, name: "queen", color: "W", tile: "D1" },
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
    { id: 23, name: "king", color: "B", tile: "E8" },
    { id: 24, name: "queen", color: "B", tile: "D8" },
    { id: 25, name: "pawn", color: "B", tile: "A7" },
    { id: 26, name: "pawn", color: "B", tile: "B7" },
    { id: 27, name: "pawn", color: "B", tile: "C7" },
    { id: 28, name: "pawn", color: "B", tile: "D7" },
    { id: 29, name: "pawn", color: "B", tile: "E7" },
    { id: 30, name: "pawn", color: "B", tile: "F7" },
    { id: 31, name: "pawn", color: "B", tile: "G7" },
    { id: 32, name: "pawn", color: "B", tile: "H7" },
  ]);
  socket.on("updatePos", (pos) => {
    setCurrPos(pos);
  });
  
  function onPlay() {}

  function flipBoard() {
    setBoardReverse(!boardReverse)
  }

  function handleMove({ pieceId, tileId }) {
    socket.emit("handleMove", currPos, { pieceId: pieceId, tileId: tileId });
  }

  return (
    <div className="Home">
      <Board reverse={boardReverse} handleMove={handleMove} pos={currPos} />
      {!isPlaying && <PlayButton onClick={onPlay} />}
      <button onClick={flipBoard}>Flip Board</button>
    </div>
  );
}
