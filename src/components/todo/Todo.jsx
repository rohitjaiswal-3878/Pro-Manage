import React from "react";
import Board from "../../utils/board/Board";
import addIcon from "../../assets/add.svg";
import minIcon from "../../assets/minimize.svg";

function Todo({ setCreateTask }) {
  return (
    <Board>
      <span>To do</span>
      <img src={addIcon} alt="" onClick={() => setCreateTask(true)} />
      <img src={minIcon} alt="" />
    </Board>
  );
}

export default Todo;
