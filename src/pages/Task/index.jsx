import React, { useEffect } from "react";
import styles from "./index.module.css";
import logo from "../../assets/icon.svg";
import { getTaskById } from "../../apis/task";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState("");
  const [due, setDue] = useState("");

  function formatDueDate(due) {
    const date = new Date(due);
    const day = date.toLocaleDateString(undefined, { day: "2-digit" });
    const month = date.toLocaleDateString(undefined, { month: "short" });

    const rem = Number(day) % 10;
    let ordinal = "";
    if (rem == 1) ordinal = "st";
    else if (rem == 2) ordinal = "nd";
    else if (rem == 3) ordinal = "rd";
    else ordinal = "th";
    setDue(month + " " + day + ordinal);
  }

  useEffect(() => {
    getTaskById(taskId).then((res) => {
      if (res.status == 200) {
        setTask({ ...res.data });
        if (res.data.due) {
          formatDueDate(res.data.due);
        }
      } else if (res.status == 404 || res.status == 500) {
        navigate("/error");
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <img src={logo} alt="Icon" />
        <span>Pro Manage</span>
      </div>

      {task ? (
        <div className={styles.task}>
          <div className={styles.priority}>
            <div
              className={styles.symbol}
              style={{
                background:
                  task.priority == "high"
                    ? "#FF2473"
                    : task.priority == "moderate"
                    ? "#18B0FF"
                    : "#63C05B",
              }}
            ></div>
            <span>{task.priority} Priority</span>
          </div>

          <div className={styles.title}>{task.title}</div>

          <div className={styles.checklist}>
            <span>
              Checklist &#40;{task.checklist.filter((e) => e.checked).length}/
              {task.checklist.length}&#41;
            </span>
          </div>

          <div className={styles.listItem}>
            {task.checklist.map((item, index) => (
              <div className={styles.item} key={index}>
                <div className={styles.customCheckbox}>
                  <input
                    type="checkbox"
                    id="checklistCheckbox"
                    name="checked"
                    defaultValue={item.checked}
                    defaultChecked={item.checked}
                    disabled={true}
                  />
                  <div className="checkmark"></div>
                </div>
                <span>{item.item}</span>
              </div>
            ))}
          </div>

          {due && (
            <div className={styles.dueDate}>
              <span>Due Date</span>
              <div className={styles.date}>{due}</div>
            </div>
          )}
        </div>
      ) : (
        <div
          id="loader"
          style={{
            marginTop: "45vh",
          }}
        ></div>
      )}
    </div>
  );
}

export default TaskPage;
