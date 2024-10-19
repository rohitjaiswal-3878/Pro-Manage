import React from "react";
import styles from "./index.module.css";
import minIcon from "../../assets/minimize.svg";

function Board({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        {children[0]}
        <div className={styles.icons}>
          {children[1]} {children[2]}
        </div>
      </div>
    </div>
  );
}

export default Board;
