import React, { useState } from "react";
import styles from "./index.module.css";
import AuthBackground from "../../utils/authBackground/AuthBackground";
import mailIcon from "../../assets/mail.png";
import passwordIcon from "../../assets/password.png";
import eyeIcon from "../../assets/eye.png";
import hideIcon from "../../assets/hide.png";
import nameIcon from "../../assets/name.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../apis/auth";

function Register() {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [togglePassord, setTogglePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = 0;

    const { name, email, password, confirmPassword } = formData;

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

    if (password == "") {
      setErrors((prev) => ({ ...prev, password: "Password is required!" }));
      err++;
    } else if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password should contain atleast 8 characters!",
      }));
      err++;
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (confirmPassword == "") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Confirm Password is required!",
      }));
      err++;
    } else if (password != confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Confirm password doesn't match with password!",
      }));
      err++;
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }

    if (err == 0) {
      setLoader(true);
      registerUser(formData)
        .then((res) => {
          if (res.status == 201) {
            localStorage.setItem("token", res.headers["x-token"]);
            localStorage.setItem("name", res.headers.name);
            navigate("/homepage/dashboard", { state: { from: "register" } });
          } else {
            toast.error(res.data.msg);
          }
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong while registering the user!");
        });
    }
  };

  return (
    <AuthBackground>
      <div className={styles.register}>
        <h3>Register</h3>

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
              placeholder="Password"
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
              marginBottom: errors.confirmPassword && "0px",
            }}
          >
            <img src={passwordIcon} alt="mail" />
            <input
              type={togglePassord.confirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleInput}
              value={formData.confirmPassword}
            />
            {togglePassord.confirmPassword ? (
              <img
                src={hideIcon}
                alt="mail"
                onClick={() => {
                  setTogglePassword({
                    ...togglePassord,
                    confirmPassword: false,
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
                    confirmPassword: true,
                  });
                }}
              />
            )}
          </div>
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}

          <button type="submit" disabled={loader}>
            {loader ? <div id="loader"></div> : "Register"}
          </button>
        </form>

        <p className={styles.haveAccount}>Have an account?</p>

        <button className={styles.register} onClick={() => navigate("/login")}>
          Log in
        </button>
      </div>
    </AuthBackground>
  );
}

export default Register;
