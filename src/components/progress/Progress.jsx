import React from "react";
import Board from "../../utils/board/Board";
import minIcon from "../../assets/minimize.svg";
import { useState } from "react";

function Progress({ progresses }) {
  const [seeMore, setSeeMore] = useState([]);

  return (
    <Board data={progresses} seeMore={seeMore} setSeeMore={setSeeMore}>
      <span>Progress</span>
      <img src={minIcon} alt="" onClick={() => setSeeMore([])} />
    </Board>
  );
}

export default Progress;
