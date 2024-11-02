import React from "react";
import Model from "../modal/Modal";
import styles from "./index.module.css";

function ConfirmBox({ children, handleSubmit, onClose, loader }) {
  return (
    <Model>
      <div className={styles.container}>
        {children[0]}
        <div className={styles.btns}>
          <button
            className={styles.yes}
            onClick={handleSubmit}
            disabled={loader}
          >
            {loader ? <div id="loader"></div> : <span>Yes, {children[1]}</span>}
          </button>
          <button className={styles.cancel} onClick={onClose} disabled={loader}>
            Cancel
          </button>
        </div>
      </div>
    </Model>
  );
}

export default ConfirmBox;
