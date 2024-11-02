import React, { useEffect } from "react";
import styles from "./index.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.svg";
import boardIcon from "../../assets/dashboard.svg";
import analyticsIcon from "../../assets/analytics.svg";
import settingsIcon from "../../assets/settings.svg";
import logoutIcon from "../../assets/Logout.svg";
import { useState } from "react";
import ConfirmBox from "../../utils/ConfirmBox";

function Homepage() {
  const { state } = useLocation();
  const location = useLocation();
  const showOnce = useRef(true);
  const navigate = useNavigate();

  const [logoutState, setLogoutState] = useState(false);
  const [selSection, setSelSection] = useState({
    dashboard: location.pathname == "/homepage/dashboard" ? true : false,
    analytics: location.pathname == "/homepage/analytics" ? true : false,
    settings: location.pathname == "/homepage/settings" ? true : false,
  });

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    toast.success("Logout Successfull!");
    navigate("/login");
  };

  const onLogoutClose = () => {
    setLogoutState(false);
  };

  const handleSelSection = (section) => {
    if (section == "dashboard") {
      setSelSection({
        dashboard: true,
        analytics: false,
        settings: false,
      });
      navigate("/homepage/dashboard");
    } else if (section == "analytics") {
      setSelSection({
        dashboard: false,
        analytics: true,
        settings: false,
      });
      navigate("/homepage/analytics");
    } else {
      setSelSection({
        dashboard: false,
        analytics: false,
        settings: true,
      });
      navigate("/homepage/settings");
    }
  };

  useEffect(() => {
    if (state) {
      if (state.from == "login" && showOnce.current) {
        toast.success("User logged in Successfully!!");
        showOnce.current = false;
      }
      if (state.from == "register" && showOnce.current) {
        toast.success("User registered Successfully!!");
        showOnce.current = false;
      }
    }

    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.heading}>
          <img src={icon} alt="site icon" />
          <span>Pro Manage</span>
        </div>

        <ul className={styles.sections}>
          <li
            className={
              styles.section + " " + (selSection.dashboard && styles.selected)
            }
            onClick={() => handleSelSection("dashboard")}
          >
            <img src={boardIcon} alt="dashboard" />
            <span>Board</span>
          </li>
          <li
            className={
              styles.section + " " + (selSection.analytics && styles.selected)
            }
            onClick={() => handleSelSection("analytics")}
          >
            <img src={analyticsIcon} alt="Analytics" />
            <span>Analytics</span>
          </li>
          <li
            className={
              styles.section + " " + (selSection.settings && styles.selected)
            }
            onClick={() => handleSelSection("settings")}
          >
            <img src={settingsIcon} alt="Settings" />
            <span>Settings</span>
          </li>
        </ul>

        <div
          className={styles.logout}
          onClick={() => {
            setLogoutState(true);
          }}
        >
          <img src={logoutIcon} alt="Logout icon" />
          <span>Logout</span>
        </div>
      </div>

      <div className={styles.mainSection}>
        <Outlet />
      </div>

      {logoutState && (
        <ConfirmBox
          handleSubmit={onLogout}
          onClose={onLogoutClose}
          loader={false}
        >
          <span>Are you sure you want to Logout?</span>
          <span>Logout</span>
        </ConfirmBox>
      )}
    </div>
  );
}

export default Homepage;
