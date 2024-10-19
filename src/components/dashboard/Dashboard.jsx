import React, { useEffect } from "react";
import styles from "./index.module.css";
import { useState } from "react";
import peopleIcon from "../../assets/people.svg";
import Backlog from "../backlog/Backlog";
import Todo from "../todo/Todo";
import Progress from "../progress/Progress";
import Done from "../done/Done";

function Dashboard() {
  const [date, setDate] = useState("");

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

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Welcome! {localStorage.getItem("name")}</h2>
        <span>{date}</span>
      </div>
      <div className={styles.headingAndFilter}>
        <h3>Board</h3>
        <div className={styles.addPeople}>
          <img src={peopleIcon} alt="People icon" />
          <span>Add people</span>
        </div>
        <select name="filter">
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="monday">This month</option>
        </select>
      </div>

      <div className={styles.board}>
        <div className={styles.allBoards}>
          <Backlog />
          <Todo />
          <Progress />
          <Done />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
