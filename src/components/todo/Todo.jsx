import React from "react";
import Board from "../../utils/board/Board";
import addIcon from "../../assets/add.svg";
import minIcon from "../../assets/minimize.svg";

function Todo() {
  return (
    <Board>
      <span>To do</span>
      <img src={addIcon} alt="" />
      <img src={minIcon} alt="" />
    </Board>
  );
}

export default Todo;
