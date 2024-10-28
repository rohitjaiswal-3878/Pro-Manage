import React, { useEffect } from "react";
import styles from "./index.module.css";
import mailIcon from "../../assets/mail.png";
import passwordIcon from "../../assets/password.png";
import eyeIcon from "../../assets/eye.png";
import hideIcon from "../../assets/hide.png";
import nameIcon from "../../assets/name.png";
import { useState } from "react";
import { getDetails, updateDetails } from "../../apis/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [userDetails, setUserDetails] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });

  const [togglePassord, setTogglePassword] = useState({
    password: false,
    newPassword: false,
  });

  useEffect(() => {
    getDetails().then((res) => {
      if (res.status == 200) {
        setFormData({
          ...formData,
          name: res.data.name,
          email: res.data.email,
        });
        setUserDetails(res.data);
      } else {
        console.log(res);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = 0;

    const { name, email, password, newPassword } = formData;

    if (name == "") {
      setErrors((prev) => ({ ...prev, name: "Name is required!" }));
      err++;
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }

    if (email == "") {
      setErrors((prev) => ({ ...prev, email: "Email is required!" }));
      err++;
    } else if (
      !email.match(/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/)
    ) {
      setErrors((prev) => ({ ...prev, email: "Invalid email!" }));
      err++;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (password.length > 0 && password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password should contain atleast 8 characters!",
      }));
      err++;
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (newPassword.length > 0 && newPassword.length < 8) {
      setErrors((prev) => ({
        ...prev,
        newPassword: "Password should contain atleast 8 characters!",
      }));
      err++;
    } else {
      setErrors((prev) => ({ ...prev, newPassword: "" }));
    }

    if (err == 0) {
      let updateCount = 0;
      let passwordError = 0;
      if (name != userDetails.name) updateCount++;
      if (email != userDetails.email) updateCount++;

      if (password != "" && newPassword == "") {
        toast.error("New password is required!");
        passwordError++;
      } else if (password == "" && newPassword != "") {
        toast.error("Old password is required!");
        passwordError++;
      } else if (
        password.length > 0 &&
        newPassword.length > 0 &&
        password == newPassword
      ) {
        toast.error("Old and new password cannot be same!");
        passwordError++;
      } else if (newPassword != "") {
        updateCount++;
      }

      if (updateCount > 1) {
        toast.error("You cannot update two things together!");
      } else if (updateCount == 1 && passwordError == 0) {
        updateDetails(formData).then((res) => {
          if (res.status == 200) {
            toast.success("Updated!");
            localStorage.removeItem("name");
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          } else {
            toast.error(res.data.msg);
          }
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Settings</h2>

      <div className={styles.mainSection}>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <div
            style={{
              marginBottom: errors.name && "0px",
            }}
            className={styles.inputFields}
          >
            <img src={nameIcon} alt="mail" />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleInput}
              value={formData.name}
              autoComplete="off"
            />
          </div>
          {errors.name && <span className={styles.error}>{errors.name}</span>}

          <div
            className={styles.inputFields}
            style={{
              marginBottom: errors.email && "0px",
            }}
          >
            <img src={mailIcon} alt="mail" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInput}
              value={formData.email}
              autoComplete="off"
            />
          </div>
          {errors.email && <span className={styles.error}>{errors.email}</span>}

          <div
            className={styles.inputFields}
            style={{
              marginBottom: errors.password && "0px",
            }}
          >
            <img src={passwordIcon} alt="mail" />
            <input
              type={togglePassord.password ? "text" : "password"}
              placeholder="Old Password"
              name="password"
              onChange={handleInput}
              value={formData.password}
            />
            {togglePassord.password ? (
              <img
                src={hideIcon}
                alt="mail"
                onClick={() => {
                  setTogglePassword({ ...togglePassord, password: false });
                }}
              />
            ) : (
              <img
                src={eyeIcon}
                alt="mail"
                onClick={() => {
                  setTogglePassword({ ...togglePassord, password: true });
                }}
              />
            )}
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}

          <div
            className={styles.inputFields}
            style={{
              marginBottom: errors.newPassword && "0px",
            }}
          >
            <img src={passwordIcon} alt="mail" />
            <input
              type={togglePassord.newPassword ? "text" : "password"}
              placeholder="New Password"
              name="newPassword"
              onChange={handleInput}
              value={formData.newPassword}
            />
            {togglePassord.newPassword ? (
              <img
                src={hideIcon}
                alt="mail"
                onClick={() => {
                  setTogglePassword({
                    ...togglePassord,
                    newPassword: false,
                  });
                }}
              />
            ) : (
              <img
                src={eyeIcon}
                alt="mail"
                onClick={() => {
                  setTogglePassword({
                    ...togglePassord,
                    newPassword: true,
                  });
                }}
              />
            )}
          </div>
          {errors.newPassword && (
            <span className={styles.error}>{errors.newPassword}</span>
          )}

          <button type="submit" disabled={loader}>
            {loader ? <div id="loader"></div> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
