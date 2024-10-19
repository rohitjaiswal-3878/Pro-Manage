import React from "react";
import Board from "../../utils/board/Board";
import minIcon from "../../assets/minimize.svg";

function Progress() {
  return (
    <Board>
      <span>Progress</span>
      <img src={minIcon} alt="" />
    </Board>
  );
}

export default Progress;
