import React, { useEffect, useState } from "react";
import Board from "../../utils/board/Board";
import addIcon from "../../assets/add.svg";
import minIcon from "../../assets/minimize.svg";
import Task from "../../utils/task/Task";

function Todo({ setCreateTask, todos }) {
  const [seeMore, setSeeMore] = useState([]);

  return (
    <Board data={todos} seeMore={seeMore} setSeeMore={setSeeMore}>
      <span>To do</span>
      <img src={addIcon} alt="" onClick={() => setCreateTask(true)} />
      <img src={minIcon} alt="" onClick={() => setSeeMore([])} />
    </Board>
  );
}

export default Todo;
