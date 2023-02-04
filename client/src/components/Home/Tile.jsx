import React from "react";

export default function Tile(props) {
  const id = props.id;
  const className = props.className;

  return <div className={className}>{props.children}</div>;
}
