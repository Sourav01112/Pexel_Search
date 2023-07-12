import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        style={{ width: "300px", marginTop: "50px" }}
        w={"300px"}
        src="https://tss-static-images.gumlet.io/notfound.png"
      />
      <p >
        We can't seem to find the page you are looking for
      </p>
      <Link to="/">
        <button>LET'S TAKE YOU HOME</button>
      </Link>
    </div>
  );
};
