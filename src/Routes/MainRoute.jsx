import React from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { ImageDescription } from "../pages/ImageDescription";
import { PageNotFound } from "../pages/PageNotFound";

export const MainRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/image/description/:id" element={<ImageDescription />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
     
    </div>
  );
};
