import React, { useState, useRef } from "react";
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
import Blank from "../../icons/blank.png";

export default function Piece(props) {
  // Offset for dragging
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [style, setStyle] = useState({});

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
    e.dataTransfer.setData("text", id);
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
    // e.target.classList.add("dragging");
    // setStyle({
    //   transform: `translate(
    //     ${(100 * (e.pageX - offsetX)) / 80}%,
    //     ${(100 * (e.pageY - offsetY)) / 80}%
    //   )`,
    // });
  }

  function dragEnd(e) {
    e.target.classList.remove("dragging");
  }

  return piece;
}
