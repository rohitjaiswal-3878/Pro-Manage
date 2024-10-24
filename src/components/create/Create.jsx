import React, { useRef } from "react";
import Modal from "../../utils/modal/Modal";
import styles from "./index.module.css";
import selectIcon from "../../assets/select.svg";
import { useState } from "react";
import deleteIcon from "../../assets/Delete.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import toast, { Toaster } from "react-hot-toast";
import { getEmails } from "../../apis/auth";
import { createTask } from "../../apis/task";

function Create({ onClose, setLoadTask, loadTask }) {
  const [toggleAssign, setToggleAssign] = useState(false);
  const [toggleDate, setToggleDate] = useState(false);
  const [value, onChange] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    checklist: [],
    due: "",
    assign: [],
  });
  const [userEmails, setUserEmails] = useState([]);
  const [userEmailLoader, setUserEmailLoader] = useState(false);
  const [assignSearch, setAssignSearch] = useState("");
  const [errors, setErrors] = useState("");
  const [loader, setLoader] = useState(false);

  // Handle due date.
  const handleDueDate = (e) => {
    const current = new Date();
    const selected = new Date(e);
    if (current < selected) {
      onChange(e);
      setFormData({ ...formData, due: selected.toDateString() });
    } else {
      onChange("");
      setFormData({ ...formData, due: "" });
      toast.error("Select upcoming dates!");
    }
    setToggleDate(false);
  };

  // Handle form input/
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  // Handle priority selection.
  const handlePriority = (priority) => {
    setFormData({ ...formData, priority });
  };

  // Handle assign user section.
  const handleAssign = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAssignSearch(value);

    if (value != "") {
      setToggleAssign(true);
      setUserEmailLoader(true);
    } else {
      setToggleAssign(false);
      setFormData({ ...formData, assign: [] });
    }

    searchEmail(value);
  };

  // Fetches user email.
  let interval = useRef(null);
  function searchEmail(value) {
    clearTimeout(interval.current);
    interval.current = setTimeout(() => {
      getEmails(value)
        .then((res) => {
          if (res.status == 200) {
            setUserEmails([...res.data]);
            setUserEmailLoader(false);
          }
        })
        .catch((err) => console.log(err));
    }, 500);
  }

  // Add checklist.
  const handleAddChecklist = () => {
    formData.checklist.push({
      checked: false,
      item: "",
    });

    setFormData({ ...formData });
  };

  // Delete checklist item.
  const deleteChecklist = (index) => {
    let newChecklist = formData.checklist.filter((elem, idx) => idx != index);
    setFormData({ ...formData, checklist: newChecklist });
  };

  // Handle changes in checklist item.
  const handleChecklistChanges = (e, index) => {
    if (e.target.name == "checked") {
      formData.checklist[index][e.target.name] = e.target.checked;
    } else {
      formData.checklist[index][e.target.name] = e.target.value;
    }
    setFormData({ ...formData });
  };

  // Handle task save
  const handleTaskSave = () => {
    let err = 0;
    setErrors("");

    const { title, priority, checklist, due, assign } = formData;
    let msg = "";
    if (title == "") {
      err++;
      msg += " Title is required!";
    }
    if (priority == "") {
      err++;
      msg += " Priority is required!";
    }
    if (checklist.length == 0) {
      err++;
      msg += " Atleast one item in checklist is required!";
    } else {
      let listErr = 0;
      checklist.map((item, index) => {
        if (item.item == "") {
          listErr++;
        }
      });

      if (listErr > 0) {
        err++;
        msg += " Checklist item text input should not be empty!";
      }
    }

    if (err == 0) {
      setErrors("");
      setLoader(true);

      createTask(formData)
        .then((res) => {
          setLoader(false);
          if (res.status == 201) {
            toast.success("Task created successfully!");
            setLoadTask(!loadTask);
            onClose();
          } else {
            toast.error("Something went wrong while task creation!");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setErrors(msg);
    }
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
        {/* Title */}
        <div className={styles.title}>
          <label htmlFor="">
            Title <span className={styles.star}>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Task Title"
            name="title"
            value={formData.title}
            onChange={handleInput}
          />
        </div>

        {/* Priority */}
        <div className={styles.priority}>
          <span className={styles.label}>
            Select Priority <span className={styles.star}>*</span>
          </span>
          <p
            onClick={() => handlePriority("high")}
            className={formData.priority == "high" ? styles.selected : ""}
          >
            <span className={styles.indication + " " + styles.red}></span>
            <span className={styles.option}>HIGH PRIORITY</span>
          </p>
          <p
            onClick={() => handlePriority("moderate")}
            className={formData.priority == "moderate" ? styles.selected : ""}
          >
            <span className={styles.indication + " " + styles.blue}></span>
            <span className={styles.option}>MODERATE PRIORITY</span>
          </p>
          <p
            onClick={() => handlePriority("low")}
            className={formData.priority == "low" ? styles.selected : ""}
          >
            <span className={styles.indication + " " + styles.green}></span>
            <span className={styles.option}>LOW PRIORITY</span>
          </p>
        </div>

        {/* Assign to */}
        <div className={styles.assign}>
          <label htmlFor="">Assign to</label>
          <div className={styles.users}>
            <div className={styles.username}>
              <input
                type="text"
                placeholder="Email"
                name="assign"
                id={styles.assign}
                onChange={handleAssign}
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleAssign(true);
                }}
                autoComplete="off"
                value={assignSearch}
              />
              <img
                src={selectIcon}
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleAssign(!toggleAssign);
                }}
              />
            </div>

            {toggleAssign && (
              <div
                className={styles.options}
                onClick={(e) => e.stopPropagation()}
              >
                {userEmailLoader ? (
                  <div id="loader"></div>
                ) : userEmails.length != 0 ? (
                  userEmails.map((email, index) => (
                    <div className={styles.account} key={index}>
                      <span className={styles.icon}>
                        {email.email.substring(0, 2).toUpperCase()}
                      </span>
                      <span className={styles.user}>{email.email}</span>
                      <button
                        onClick={() => {
                          setFormData({ ...formData, assign: [email.email] });
                          setAssignSearch(email.email);
                          setToggleAssign(false);
                        }}
                      >
                        Assign
                      </button>
                    </div>
                  ))
                ) : (
                  <span className={styles.noMatch}>No match found!</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Checklist */}
        <div className={styles.checklist}>
          <p className={styles.checklistHeading}>
            <span>
              Checklist &#40;
              {formData.checklist.filter((e, i) => e.checked).length +
                "/" +
                formData.checklist.length}
              &#41;{" "}
            </span>
            <span className={styles.star}>*</span>
          </p>

          <div className={styles.list}>
            {formData.checklist.map((listItem, index) => (
              <div className={styles.listItem} key={index}>
                <div className={styles.customCheckbox}>
                  <input
                    type="checkbox"
                    id="checklistCheckbox"
                    onChange={(e) => handleChecklistChanges(e, index)}
                    name="checked"
                    value={listItem.checked}
                    checked={listItem.checked}
                  />
                  <div className="checkmark"></div>
                </div>
                <input
                  type="text"
                  id={styles.text}
                  onChange={(e) => handleChecklistChanges(e, index)}
                  name="item"
                  value={listItem.item}
                  placeholder="Task to be done"
                />
                <img
                  src={deleteIcon}
                  alt="delete icon"
                  onClick={() => deleteChecklist(index)}
                />
              </div>
            ))}
          </div>

          <div className={styles.addItem} onClick={handleAddChecklist}>
            <span>+</span> Add item
          </div>
        </div>

        {/* Due date, cancel, and post button. */}
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
            <button
              className={styles.cancel}
              onClick={onClose}
              disabled={loader}
            >
              Cancel
            </button>
            <button
              className={styles.save}
              onClick={handleTaskSave}
              disabled={loader}
              style={{
                padding: loader ? "5px 0px" : "",
              }}
            >
              {loader ? <div id="loader"></div> : "Save"}
            </button>
          </div>
        </div>

        {/* Error message*/}
        {errors && <div className={styles.error}>{errors}</div>}

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
