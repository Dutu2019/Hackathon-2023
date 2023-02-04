import React, { useState } from "react";
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

export default function Piece(props) {
  // Offset for dragging
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [style, setStyle] = useState({});

  const canvas = document.createElement("canvas");

  const id = props.id;
  const coords = props.tile;
  const type = props.type;
  const img = <img src={getImg(type)} alt="" />;
  const piece = (
    <div
      className="Piece"
      style={style}
      draggable
      onDragStart={dragStart}
      onDrag={move}
      onDragOver={dragOver}
      onDragEnd={dragEnd}
    >
      {img}
    </div>
  );

  function getImg(params) {
    if (params.color === "W") {
      if (params.name === "rook") {
        return Wrook;
      } else if (params.name === "knight") {
        return Wknight;
      } else if (params.name === "bishop") {
        return Wbishop;
      } else if (params.name === "queen") {
        return Wqueen;
      } else if (params.name === "king") {
        return Wking;
      } else if (params.name === "pawn") {
        return Wpawn;
      }
    } else if (params.color === "B") {
      if (params.name === "rook") {
        return Brook;
      } else if (params.name === "knight") {
        return Bknight;
      } else if (params.name === "bishop") {
        return Bbishop;
      } else if (params.name === "queen") {
        return Bqueen;
      } else if (params.name === "king") {
        return Bking;
      } else if (params.name === "pawn") {
        return Bpawn;
      }
    }
  }

  function dragStart(e) {
    if (offsetX === 0 && offsetY === 0) {
      setOffsetX(e.target.getBoundingClientRect().left);
      setOffsetY(e.target.getBoundingClientRect().top);
    }
    e.dataTransfer.setDragImage(
      e.target,
      window.outerWidth,
      window.outerHeight
    );
  }

  function move(e) {
    e.target.classList.add("dragging");
    e.dataTransfer.setDragImage(canvas, 0, 0);
    setStyle({
      left: `${e.pageX - offsetX}px`,
      top: `${e.pageY - offsetY}px`,
    });
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnd(e) {
    e.target.classList.remove("dragging");
  }

  return piece;
}
