import React, { Children } from "react";
import styles from "./index.module.css";

function Modal({ children }) {
  return (
    <>
      <div className={styles.blackSpace}></div>
      <div className={styles.container}>{children}</div>
    </>
  );
}

export default Modal;
