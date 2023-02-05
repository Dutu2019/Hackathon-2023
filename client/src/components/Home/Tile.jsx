import React from "react";

export default function Tile(props) {
  const id = props.id;
  const className = props.className;

  function allowDrop(e) {
    e.preventDefault();
  }

  function onDrop(e) {
    const draggedId = e.dataTransfer.getData("text");
    props.moveTo({pieceId: draggedId, tileId: id});
    console.log(id)
  }

  return (
    <div className={className} onDragOver={allowDrop} onDrop={onDrop}>
      {props.children}
    </div>
  );
}
