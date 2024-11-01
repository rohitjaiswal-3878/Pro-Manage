import React from "react";

function Error() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "10rem",
          color: "red",
        }}
      >
        404
      </span>
      <span
        style={{
          color: "red",
        }}
      >
        Page not found
      </span>
    </div>
  );
}

export default Error;
