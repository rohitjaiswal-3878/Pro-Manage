import React from "react";
import styles from "./index.module.css";
import minIcon from "../../assets/minimize.svg";
import Task from "../task/Task";

function Board({ children, boardType }) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        {children[0]}
        <div className={styles.icons}>
          {children[1]} {children[2]}
        </div>
      </div>

      {boardType == "todo" && (
        <div className={styles.mainSection}>
          {" "}
          <Task /> <Task /> <Task /> <Task /> <Task />{" "}
        </div>
      )}
    </div>
  );
}

export default Board;
