import React, { useEffect } from "react";
import styles from "./index.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

function Homepage() {
  const { state } = useLocation();
  const showOnce = useRef(true);

  useEffect(() => {
    if (state.from == "login" && showOnce.current) {
      toast.success("User logged in Successfully!!");
      showOnce.current = false;
    }
    if (state.from == "register" && showOnce.current) {
      toast.success("User registered Successfully!!");
      showOnce.current = false;
    }
  }, []);
  return (
    <div>
      Homepage <Toaster />
    </div>
  );
}

export default Homepage;
