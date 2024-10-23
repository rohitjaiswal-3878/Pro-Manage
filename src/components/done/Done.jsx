import React from "react";
import Board from "../../utils/board/Board";
import minIcon from "../../assets/minimize.svg";
import { useState } from "react";

function Done({ dones }) {
  const [seeMore, setSeeMore] = useState([]);

  return (
    <Board data={dones} seeMore={seeMore} setSeeMore={setSeeMore}>
      <span>Done</span>
      <img src={minIcon} alt="" onClick={() => setSeeMore([])} />
    </Board>
  );
}

export default Done;
