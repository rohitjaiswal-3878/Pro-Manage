import React from "react";
import Board from "../../utils/board/Board";
import minIcon from "../../assets/minimize.svg";

function Backlog() {
  return (
    <Board>
      <span>Backlog</span>
      <img src={minIcon} alt="" />
    </Board>
  );
}

export default Backlog;
