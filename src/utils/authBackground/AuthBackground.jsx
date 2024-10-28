import React from "react";
import styles from "./index.module.css";
import bgIcon from "../../assets/bg.png";
import { Toaster } from "react-hot-toast";

function AuthBackground({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.iconAndText}>
          <div className={styles.icon}>
            <div className={styles.circle}></div>
            <img src={bgIcon} alt="bg icon" className={styles.image} />
          </div>
          <div className={styles.text}>
            <h3>Welcome aboard my friend</h3>
            <span>just a couple of clicks and we start</span>
          </div>
        </div>
      </div>
      <div className={styles.form}>{children}</div>
    </div>
  );
}

export default AuthBackground;
