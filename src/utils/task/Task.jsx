import React from "react";
import styles from "./index.module.css";
import moreIcon from "../../assets/more.svg";
import arrowDownIcon from "../../assets/arrow-down.svg";
import arrowUpIcon from "../../assets/arrow-up.svg";
import { useState } from "react";

function Task() {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.priority}>
          <div className={styles.color}></div>
          <span>Low priority</span>
        </div>
        <img src={moreIcon} alt="more icon" className={styles.more} />
      </div>

      <h3 className={styles.title}>Task 1</h3>

      <div className={styles.checklist}>
        <span>Checklist &#40;0/3&#41;</span>
        <img
          src={seeMore ? arrowUpIcon : arrowDownIcon}
          alt="arrow down"
          onClick={() => setSeeMore(!seeMore)}
        />
      </div>

      {seeMore && (
        <div className={styles.listItem}>
          <div className={styles.item}>
            <div className={styles.customCheckbox}>
              <input type="checkbox" id="checklistCheckbox" name="checked" />
              <div className="checkmark"></div>
            </div>
            <span>Task to be done.Task to be done.Task e done.</span>
          </div>
        </div>
      )}

      <div className={styles.dateBacklogProgressDone}>
        <div className={styles.date}>feb 10th</div>

        <div className={styles.backlogProgressDone}>
          <div className={styles.backlog}>Backlog</div>
          <div className={styles.progress}>progress</div>
          <div className={styles.done}>done</div>
        </div>
      </div>
    </div>
  );
}

export default Task;
