import React from "react";
import Board from "../../utils/board/Board";
import minIcon from "../../assets/minimize.svg";

function Done() {
  return (
    <Board>
      <span>Done</span>
      <img src={minIcon} alt="" />
    </Board>
  );
}

export default Done;
