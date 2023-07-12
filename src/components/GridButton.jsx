import React, { useState } from "react";
import "../style/Homepage.css";
import { useDispatch } from "react-redux";
import { SetLoading } from "../redux/loaderSlice";

export const GridButton = ({ gridSize, setGridSize }) => {
  const dispatch = useDispatch();

  // loading before change
  const loaderFunc = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
    }, 1000);
  };

  // Grid Size as per requirement
  const handleChangeGridSize = (size) => {
    setGridSize(size);
  };

  return (
    <div className="gridButton">
      <p
        style={{
          fontFamily: "sans-serif",
          display: "flex",

          alignItems: "center",
        }}
      >
        Select View
      </p>
      <button
        className={gridSize === 2 ? "selected" : ""}
        onClick={() => {
          loaderFunc();
          handleChangeGridSize(2);
        }}
      >
        2
      </button>
      <button
        className={gridSize === 3 ? "selected" : ""}
        onClick={() => {
          loaderFunc();
          handleChangeGridSize(3);
        }}
      >
        3
      </button>
      <button
        className={gridSize === 4 ? "selected" : ""}
        onClick={() => {
          loaderFunc();
          handleChangeGridSize(4);
        }}
      >
        4
      </button>
      <button
        className={gridSize === 5 ? "selected" : ""}
        onClick={() => {
          loaderFunc();
          handleChangeGridSize(5);
        }}
      >
        5
      </button>
    </div>
  );
};
