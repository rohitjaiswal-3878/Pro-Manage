import React from "react";
import Modal from "../../utils/modal/Modal";
import styles from "./index.module.css";
import selectIcon from "../../assets/select.svg";
import { useState } from "react";
import deleteIcon from "../../assets/delete.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import toast, { Toaster } from "react-hot-toast";

function Create() {
  const [toggleAssign, setToggleAssign] = useState(false);
  const [toggleDate, setToggleDate] = useState(false);
  const [value, onChange] = useState("");

  const handleDueDate = (e) => {
    const current = new Date();
    const selected = new Date(e);
    if (current < selected) {
      onChange(e);
    } else {
      onChange("");
      toast.error("Select upcoming dates!");
    }
    setToggleDate(false);
  };
  return (
    <Modal>
      <div
        className={styles.container}
        onClick={() => {
          setToggleAssign(false);
          setToggleDate(false);
        }}
      >
        <div className={styles.title}>
          <label htmlFor="">
            Title <span className={styles.star}>*</span>
          </label>
          <input type="text" placeholder="Enter Task Title" />
        </div>

        <div className={styles.priority}>
          <span className={styles.label}>
            Select Priority <span className={styles.star}>*</span>
          </span>
          <p className={styles.selected}>
            <span className={styles.indication + " " + styles.red}></span>
            <span className={styles.option}>HIGH PRIORITY</span>
          </p>
          <p>
            <span className={styles.indication + " " + styles.blue}></span>
            <span className={styles.option}>MODERATE PRIORITY</span>
          </p>
          <p>
            <span className={styles.indication + " " + styles.green}></span>
            <span className={styles.option}>LOW PRIORITY</span>
          </p>
        </div>

        <div className={styles.assign}>
          <label htmlFor="">Assign to</label>
          <div className={styles.users}>
            <div
              className={styles.username}
              onClick={(e) => {
                e.stopPropagation();
                setToggleAssign(!toggleAssign);
              }}
            >
              <span>rohit</span>
              <img src={selectIcon} alt="" />
            </div>

            {toggleAssign && (
              <div
                className={styles.options}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.account}>
                  <span className={styles.icon}>R</span>
                  <span className={styles.user}>rohit@gmail.com</span>
                  <button>Assign</button>
                </div>
                <div className={styles.account}>
                  <span className={styles.icon}>R</span>
                  <span className={styles.user}>rohit@gmail.com</span>
                  <button>Assign</button>
                </div>
                <div className={styles.account}>
                  <span className={styles.icon}>R</span>
                  <span className={styles.user}>rohit@gmail.com</span>
                  <button>Assign</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.checklist}>
          <p className={styles.checklistHeading}>
            <span>Checklist </span>
            <span className={styles.star}>*</span>
          </p>

          <div className={styles.list}>
            <div className={styles.listItem}>
              <div className={styles.customCheckbox}>
                <input type="checkbox" id="checklistCheckbox" />
                <div className="checkmark"></div>
              </div>
              <input type="text" id={styles.text} />
              <img src={deleteIcon} alt="delete icon" />
            </div>
            <div className={styles.listItem}>
              <div className={styles.customCheckbox}>
                <input type="checkbox" id="checklistCheckbox" />
                <div className="checkmark"></div>
              </div>
              <input type="text" id={styles.text} />
              <img src={deleteIcon} alt="delete icon" />
            </div>
            <div className={styles.listItem}>
              <div className={styles.customCheckbox}>
                <input type="checkbox" id="checklistCheckbox" />
                <div className="checkmark"></div>
              </div>
              <input type="text" id={styles.text} />
              <img src={deleteIcon} alt="delete icon" />
            </div>
            <div className={styles.listItem}>
              <div className={styles.customCheckbox}>
                <input type="checkbox" id="checklistCheckbox" />
                <div className="checkmark"></div>
              </div>
              <input type="text" id={styles.text} />
              <img src={deleteIcon} alt="delete icon" />
            </div>
            <div className={styles.listItem}>
              <div className={styles.customCheckbox}>
                <input type="checkbox" id="checklistCheckbox" />
                <div className="checkmark"></div>
              </div>
              <input type="text" id={styles.text} />
              <img src={deleteIcon} alt="delete icon" />
            </div>
          </div>

          <div className={styles.addItem}>
            <span>+</span> Add item
          </div>
        </div>

        <div className={styles.dueCancelPost}>
          <button
            className={styles.due}
            onClick={(e) => {
              e.stopPropagation();
              setToggleDate(!toggleDate);
            }}
          >
            {value == "" ? (
              "Select Due Date"
            ) : (
              <span>
                {value.getMonth() +
                  1 +
                  "/" +
                  value.getDate() +
                  "/" +
                  value.getFullYear()}
              </span>
            )}
          </button>
          <div className={styles.cancelSave}>
            <button className={styles.cancel}>Cancel</button>
            <button className={styles.save}>Save</button>
          </div>
        </div>

        {toggleDate && (
          <div className={styles.calender}>
            <Calendar onChange={(e) => handleDueDate(e)} value={value} />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default Create;
