import React, { useEffect, useState } from "react";
import { SearchForm } from "../components/SearchForm";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Link, useSearchParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { GridButton } from "../components/GridButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-toastify/dist/ReactToastify.css";
import "../style/Homepage.css";

export const Homepage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.getAll("query");
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const [gridSize, setGridSize] = useState(4);
  const [selectedOption, setSelectedOption] = useState("portrait");
  const { isLoading, images, totalCount, next } = useSelector(
    (store) => store.imageReducer
  );
 

  // showing image type as per select option
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // validation check if the button is selected with images length === 0
  useEffect(() => {
    if (
      (gridSize === 2 || gridSize === 3 || gridSize === 4 || gridSize === 5) &&
      images.length === 0
    ) {
      toast.error("Cannot change layout, please Search", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

        transition: Slide,
      });
    }
  }, [gridSize, images]);

  return (
    <div className="bigContainer">
      <ToastContainer transition={Slide} />
      <h1 style={{ margin: "auto" }}>Pexel API</h1>

      {/*  SearchForm Component */}
      <SearchForm query={query} setQuery={setQuery} />

      {/*  Select Element */}
      <div className="gridChange">
        <select
          className="round"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
          <option value="original">Small</option>
        </select>

        {/* Grid Button Component */}
        <GridButton gridSize={gridSize} setGridSize={setGridSize} />
      </div>

      {/*  Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 2fr)`,
        }}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : images && images.length > 0 ? (
          images.map((ele) => (
            <Link to={`image/description/${ele.id}`} key={ele.id}>
              <div className="Container">
                <div className="imageContainer">
                  <LazyLoadImage
                    src={
                      selectedOption === "landscape"
                        ? ele.src.landscape
                        : selectedOption === "portrait"
                        ? ele.src.portrait
                        : ele.src.small
                    }
                    alt="Image"
                    effect="blur"
                  />
                </div>
                <Link to={`image/description/${ele.id}`}>
                  <button className="containerButton">More</button>
                </Link>
              </div>
            </Link>
          ))
        ) : (
          <p className="noImage">Sorry 😔, No Photos. Please Search!</p>
        )}
      </div>
    </div>
  );
};
