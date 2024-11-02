import React, { useEffect } from "react";
import styles from "./index.module.css";
import { getAnalytics } from "../../apis/task";
import { useState } from "react";
import toast from "react-hot-toast";

function Analytics() {
  const [analytics, setAnalytics] = useState("");

  // Loads the analytics data.
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAnalytics().then((res) => {
        if (res.status == 200) {
          setAnalytics({ ...res.data });
        } else {
          toast.error("Something went wrong while loading analytics!");
        }
      });
    }
  }, []);

  // Conver the single digit number to 2 digits.
  function convertTwoDigits(num) {
    if (num < 9) {
      return "0" + num;
    } else {
      return num;
    }
  }
  return (
    <div className={styles.container}>
      <h2>Analytics</h2>

      <div className={styles.mainSection}>
        {/* Section 1 */}
        <div className={styles.analytic}>
          {analytics ? (
            <ul className={styles.list}>
              <li>
                <span className={styles.listItem}>
                  Backlog Tasks{" "}
                  <span>
                    {analytics.backlog
                      ? convertTwoDigits(analytics.backlog)
                      : 0}
                  </span>
                </span>
              </li>
              <li>
                <span className={styles.listItem}>
                  To-do Tasks{" "}
                  <span>
                    {analytics.todo ? convertTwoDigits(analytics.todo) : 0}
                  </span>
                </span>
              </li>
              <li>
                <span className={styles.listItem}>
                  In-Progress Tasks{" "}
                  <span>
                    {analytics.progress
                      ? convertTwoDigits(analytics.progress)
                      : 0}
                  </span>
                </span>
              </li>
              <li>
                <span className={styles.listItem}>
                  Completed Tasks{" "}
                  <span>
                    {analytics.done ? convertTwoDigits(analytics.done) : 0}
                  </span>
                </span>
              </li>
            </ul>
          ) : (
            <div id="loader"></div>
          )}
        </div>

        {/* Section 2 */}
        <div className={styles.analytic}>
          {analytics ? (
            <ul className={styles.list}>
              <li>
                <span className={styles.listItem}>
                  Low Priority{" "}
                  <span>
                    {analytics.low ? convertTwoDigits(analytics.low) : 0}
                  </span>
                </span>
              </li>
              <li>
                <span className={styles.listItem}>
                  Moderate Priority{" "}
                  <span>
                    {analytics.moderate
                      ? convertTwoDigits(analytics.moderate)
                      : 0}
                  </span>
                </span>
              </li>
              <li>
                <span className={styles.listItem}>
                  High Priority{" "}
                  <span>
                    {analytics.high ? convertTwoDigits(analytics.high) : 0}
                  </span>
                </span>
              </li>
              <li>
                <span className={styles.listItem}>
                  Due Date Tasks{" "}
                  <span>
                    {analytics.due ? convertTwoDigits(analytics.due) : 0}
                  </span>
                </span>
              </li>
            </ul>
          ) : (
            <div id="loader"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
