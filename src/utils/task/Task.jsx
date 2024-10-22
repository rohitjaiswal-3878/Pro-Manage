import React from 'react'
import styles from "./index.module.css"
import moreIcon from "../../assets/more.svg"

function Task() {
  return (
    <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.priority}>
            <div className={styles.color}></div>
            <span>Low priority</span>
          </div>
          <img src={moreIcon} alt="more icon" className={styles.more}/>
        </div>

        <h3 className={styles.title}>Task 1</h3>
    </div>
  )
}

export default Task