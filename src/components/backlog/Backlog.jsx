import React from "react";
import Board from "../../utils/board/Board";
import minIcon from "../../assets/minimize.svg";
import { useState } from "react";

function Backlog({ backlogs }) {
  const [seeMore, setSeeMore] = useState([]);

  return (
    <Board data={backlogs} seeMore={seeMore} setSeeMore={setSeeMore}>
      <span>Backlog</span>
      <img src={minIcon} alt="" onClick={() => setSeeMore([])} />
    </Board>
  );
}

export default Backlog;
