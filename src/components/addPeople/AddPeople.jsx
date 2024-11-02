import React from "react";
import styles from "./index.module.css";
import Modal from "../../utils/modal/Modal";
import { useState } from "react";
import { addPeopleToBoard } from "../../apis/task";
import toast from "react-hot-toast";

function AddPeople({ setAddPeopleState, fetchBoardPeople }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);

  // Handle add email
  const handleAddEmail = () => {
    if (email == "") setError("Email is required!");
    else if (!email.match(/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/))
      setError("Invalid email address!");
    else {
      setError("");

      setLoader(true);
      addPeopleToBoard(email)
        .then((res) => {
          setLoader(false);

          if (res.status == 200) {
            setSuccess(true);
            fetchBoardPeople();
          } else {
            toast.error(res.data.msg);
          }
        })
        .catch((err) => conosle.log(err));
    }
  };
  return (
    <Modal>
      <div className={styles.container}>
        {success ? (
          <div className={styles.success}>
            <span>{email} added to board</span>
            <button
              className={styles.gotIt}
              onClick={() => setAddPeopleState(false)}
            >
              Okay, got it!
            </button>
          </div>
        ) : (
          <>
            <span>Add people to the board</span>
            <input
              type="text"
              placeholder="Enter the email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className={styles.btns}>
              <button
                className={styles.cancel}
                onClick={() => setAddPeopleState(false)}
                disabled={loader}
              >
                Cancel
              </button>
              <button
                className={styles.addEmail}
                onClick={handleAddEmail}
                disabled={loader}
                style={{
                  padding: loader ? "3px" : "",
                }}
              >
                {loader ? <div id="loader"></div> : "Add Email"}
              </button>
            </div>

            {error && <span className={styles.error}>{error}</span>}
          </>
        )}
      </div>
    </Modal>
  );
}

export default AddPeople;
