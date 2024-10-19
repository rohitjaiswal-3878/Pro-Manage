import React from "react";
import styles from "./login.module.css";
import AuthBackground from "../../utils/authBackground/AuthBackground";
import mailIcon from "../../assets/mail.png";
import passwordIcon from "../../assets/password.png";
import eyeIcon from "../../assets/eye.png";
import hideIcon from "../../assets/hide.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [togglePassord, setTogglePassword] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = 0;

    const { email, password } = formData;

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

    if (err == 0) {
      setLoader(true);

      loginUser(formData)
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem("token", res.headers["x-token"]);
            localStorage.setItem("name", res.headers.name);
            navigate("/homepage/dashboard", { state: { from: "login" } });
          } else {
            toast.error(res.data.msg);
          }
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong while logging in!");
          setLoader(false);
        });
    }
  };

  return (
    <AuthBackground>
      <div className={styles.login}>
        <h3>Login</h3>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
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
              type={togglePassord ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleInput}
              value={formData.password}
            />
            {togglePassord ? (
              <img
                src={hideIcon}
                alt="mail"
                onClick={() => {
                  setTogglePassword(false);
                }}
              />
            ) : (
              <img
                src={eyeIcon}
                alt="mail"
                onClick={() => {
                  setTogglePassword(true);
                }}
              />
            )}
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}

          <button type="submit" disabled={loader}>
            {loader ? <div id="loader"></div> : "Login"}
          </button>
        </form>

        <p className={styles.noAccount}>Have no account yet?</p>
        <button
          className={styles.register}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </AuthBackground>
  );
}

export default Login;
