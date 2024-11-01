import React from "react";
import Model from "../modal/Modal";
import styles from "./index.module.css";

function ConfirmBox({ children, onDelete, onDeleteClose, deleteLoader }) {
  return (
    <Model>
      <div className={styles.container}>
        {children[0]}
        <div className={styles.btns}>
          <button
            className={styles.yes}
            onClick={onDelete}
            disabled={deleteLoader}
          >
            {deleteLoader ? (
              <div id="loader"></div>
            ) : (
              <span>Yes, {children[1]}</span>
            )}
          </button>
          <button
            className={styles.cancel}
            onClick={onDeleteClose}
            disabled={deleteLoader}
          >
            Cancel
          </button>
        </div>
      </div>
    </Model>
  );
}

export default ConfirmBox;
