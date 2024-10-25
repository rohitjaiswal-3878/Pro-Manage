import React, { useEffect } from "react";
import styles from "./index.module.css";
import { useState } from "react";
import peopleIcon from "../../assets/people.svg";
import Backlog from "../backlog/Backlog";
import Todo from "../todo/Todo";
import Progress from "../progress/Progress";
import Done from "../done/Done";
import Create from "../create/Create";
import { getTasks } from "../../apis/task";
import toast from "react-hot-toast";
import boardContext from "../../context/dashboard";
import AddPeople from "../addPeople/AddPeople";

function Dashboard() {
  const [date, setDate] = useState("");
  const [createTask, setCreateTask] = useState(false);
  const [loadTask, setLoadTask] = useState(false);
  const [tasks, setTasks] = useState({});
  const [addPeopleState, setAddPeopleState] = useState(false);
  const [filter, setFilter] = useState("today");

  // Handle filters.
  const handleFilter = (e) => {
    setFilter(e.target.value);
    setLoadTask(!loadTask);
  };

  // Getting current date.
  useEffect(() => {
    const date = new Date();
    const day = date.toLocaleDateString(undefined, { day: "2-digit" });
    const month = date.toLocaleDateString(undefined, { month: "short" });
    const year = date.toLocaleDateString(undefined, { year: "numeric" });

    const rem = Number(day) % 10;
    let ordinal = "";
    if (rem == 1) ordinal = "st";
    else if (rem == 2) ordinal = "nd";
    else if (rem == 3) ordinal = "rd";
    else ordinal = "th";
    setDate(day + ordinal + " " + month + ", " + year);
  }, []);

  useEffect(() => {
    getTasks(filter)
      .then((res) => {
        if (res.status == 200) {
          setTasks({ ...res.data });
        } else {
          toast.error("Something went wrong while loading board tasks!!");
        }
      })
      .catch((err) => console.log(err));
  }, [loadTask]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Welcome! {localStorage.getItem("name")}</h2>
        <span>{date}</span>
      </div>
      <div className={styles.headingAndFilter}>
        <h3>Board</h3>
        <div
          className={styles.addPeople}
          onClick={() => setAddPeopleState(true)}
        >
          <img src={peopleIcon} alt="People icon" />
          <span>Add people</span>
        </div>
        <select name="filter" onChange={handleFilter} value={filter}>
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </div>

      <boardContext.Provider value={{ loadTask, setLoadTask }}>
        <div className={styles.board}>
          <div className={styles.allBoards}>
            <Backlog backlogs={tasks.backlog} />
            <Todo setCreateTask={setCreateTask} todos={tasks.todo} />
            <Progress progresses={tasks.progress} />
            <Done dones={tasks.done} />
          </div>
        </div>
      </boardContext.Provider>

      {createTask && (
        <Create
          onClose={() => setCreateTask(false)}
          setLoadTask={setLoadTask}
          loadTask={loadTask}
        ></Create>
      )}

      {addPeopleState && <AddPeople setAddPeopleState={setAddPeopleState} />}
    </div>
  );
}

export default Dashboard;
