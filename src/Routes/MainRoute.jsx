import React from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/Homepage";

export const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};
