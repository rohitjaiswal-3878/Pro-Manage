import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import moreIcon from "../../assets/more.svg";
import arrowDownIcon from "../../assets/arrow-down.svg";
import arrowUpIcon from "../../assets/arrow-up.svg";
import { useState } from "react";
import { updateTask } from "../../apis/task";
import { useContext } from "react";
import boardContext from "../../context/dashboard";
import Edit from "../../components/edit";
import toast from "react-hot-toast";

function Task({ task, seeMore, setSeeMore, idx }) {
  const [due, setDue] = useState({
    date: "",
    color: "",
  });
  const { loadTask, setLoadTask } = useContext(boardContext);
  const [latestState, setLatestState] = useState(false);
  const interval = useRef(null);
  const [dropDown, setDropDown] = useState(false);
  const [editState, setEditState] = useState(false);

  // Format the due date.
  useEffect(() => {
    if (task.due) {
      const date = new Date(task.due);
      const currentDate = new Date();

      let color = "";
      if (currentDate > date) {
        color = "#CF3636";
      }
      const day = date.toLocaleDateString(undefined, { day: "2-digit" });
      const month = date.toLocaleDateString(undefined, { month: "short" });

      const rem = Number(day) % 10;
      let ordinal = "";
      if (rem == 1) ordinal = "st";
      else if (rem == 2) ordinal = "nd";
      else if (rem == 3) ordinal = "rd";
      else ordinal = "th";
      setDue({ date: month + " " + day + ordinal, color });
    }
  }, [task, latestState]);

  // Handle the board switch.
  const handleBoardSwitch = (board) => {
    if (board != task.board) {
      task.board = board;

      updateTask(task).then((res) => {
        if (res.status == 200) {
          setSeeMore([]);
          setLoadTask(!loadTask);
        }
      });
    }
  };

  // Handle checkbix updates.
  const handleCheckbox = (e, i) => {
    task.checklist[i].checked = e.target.checked;
    setLatestState(!latestState);
    updateTaskInDB(task);
  };

  // Updates the checkbox state in db.
  function updateTaskInDB(data) {
    clearTimeout(interval.current);
    interval.current = setTimeout(() => {
      updateTask(data);
    }, 1000);
  }

  return (
    <div className={styles.container} onClick={() => setDropDown(false)}>
      {/* Heading */}
      <div className={styles.heading}>
        <div className={styles.priority}>
          <div
            className={styles.color}
            style={{
              background:
                task.priority == "high"
                  ? "#FF2473"
                  : task.priority == "moderate"
                  ? "#18B0FF"
                  : "#63C05B",
            }}
          ></div>
          <span>{task.priority} priority</span>
          {task.assignTo.assignUser &&
            task.assignTo.userId == localStorage.getItem("userId") && (
              <div className={styles.assignIcon}>
                {task.assignTo.assignUser.substring(0, 2).toUpperCase()}
              </div>
            )}
        </div>

        <div className={styles.more}>
          <img
            src={moreIcon}
            alt="more icon"
            onClick={(e) => {
              e.stopPropagation();
              setDropDown(!dropDown);
            }}
          />

          {dropDown && (
            <ul className={styles.dropDown}>
              <li
                onClick={() => {
                  setEditState(!editState);
                  setDropDown(!dropDown);
                }}
              >
                Edit
              </li>
              <li>Share</li>
              <li>Delete</li>
            </ul>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className={styles.title}>
        {task.title.length > 50
          ? task.title.substring(0, 50) + "..."
          : task.title}
      </h3>

      {/* Cheklist heading. */}
      <div className={styles.checklist}>
        <span>
          Checklist &#40;{task.checklist.filter((e) => e.checked).length}/
          {task.checklist.length}&#41;
        </span>
        <img
          src={seeMore.includes(idx) ? arrowUpIcon : arrowDownIcon}
          alt="arrow down"
          onClick={() => {
            if (!seeMore.includes(idx)) {
              setSeeMore([...seeMore, idx]);
            } else {
              setSeeMore(seeMore.filter((e) => e != idx));
            }
          }}
        />
      </div>

      {/* Checklist item. */}
      {seeMore.includes(idx) && (
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
                  onChange={(e) => handleCheckbox(e, index)}
                />
                <div className="checkmark"></div>
              </div>
              <span>{item.item}</span>
            </div>
          ))}
        </div>
      )}

      {/* Due date and switch board buttons. */}
      <div className={styles.dateBacklogProgressDone}>
        <div
          className={styles.date}
          style={{
            visibility: !task.due ? "hidden" : !due.date && "hidden",
            background:
              task.board == "done" ? "#63C05B" : due.color ? due.color : "",
            color: task.board == "done" ? "white" : due.color ? "white" : "",
            fontWeight: "600",
          }}
        >
          {task.due && due.date && due.date}
        </div>

        <div className={styles.backlogProgressDone}>
          {task.board != "backlog" && (
            <div
              className={styles.backlog}
              onClick={() => {
                handleBoardSwitch("backlog");
              }}
            >
              Backlog
            </div>
          )}

          {task.board != "progress" && (
            <div
              className={styles.progress}
              onClick={() => handleBoardSwitch("progress")}
            >
              progress
            </div>
          )}

          {task.board != "done" && (
            <div
              className={styles.done}
              onClick={() => handleBoardSwitch("done")}
            >
              done
            </div>
          )}

          {task.board != "todo" && (
            <div
              className={styles.done}
              onClick={() => handleBoardSwitch("todo")}
            >
              todo
            </div>
          )}
        </div>
      </div>

      {editState && (
        <Edit
          editState={editState}
          setEditState={setEditState}
          taskId={task._id}
        />
      )}
    </div>
  );
}

export default Task;
