import React from "react";
import { useState, useEffect } from "react";
import "../App.css";

import { IoMdArrowDropupCircle } from "react-icons/io";

export const TopButton = () => {
  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = document.documentElement.scrollHeight * 0.05;

      if (window.scrollY > threshold) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="topBtn">
      {isTop && (
        <IoMdArrowDropupCircle
          className="insidetopBtn"
          color="white"
          onClick={scrollToTop}
        />
      )}
    </div>
  );
};


