import React, { useEffect, useState } from "react";
import { SearchForm } from "../components/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../redux/loaderSlice";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-toastify/dist/ReactToastify.css";
import "../style/Homepage.css";


export const Homepage = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState("");
  const [gridSize, setGridSize] = useState(4);
  const [selectedOption, setSelectedOption] = useState("portrait");
  const { isLoading, images, totalCount, next } = useSelector(
    (store) => store.imageReducer
  );
  const totalPages = Math.ceil(totalCount / 5);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setShowLoading(true);
    }, 4000);
    return () => {
      clearTimeout(id);
    };
  }, []);

  const loaderFunc = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
    }, 1000);
  };

  // console.log("@@useSelector", images);
  // console.log("@@totalPages", totalPages);

  // Grid Size as per requirement
  const handleChangeGridSize = (size) => {
    setGridSize(size);
  };

  // showing image type as per select option
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // validation check if the button is selected with images length === 0
  useEffect(() => {
    if (
      (gridSize === 3 || gridSize === 4 || gridSize === 5) &&
      images.length === 0
    ) {
      toast.error("No images available", {
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
      <SearchForm
        query={query}
        setQuery={setQuery}
        page={page}
        setPage={setPage}
      />
      <div className="gridChange">
        <select onChange={handleSelectChange} value={selectedOption}>
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
          <option value="original">Small</option>
        </select>

        {/* <p>Current Grid: {gridSize}</p> */}

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
      </div>

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
            <div key={ele.id} className="Container">
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
          ))
        ) : (
          <p style={{ color: "red", margin: "auto" }}>
            Sorry 😔, No Photos. Please Search!
          </p>
        )}
      </div>

      {/* Pagination */}
      {/* <button onClick={nextCall}>Next</button> */}
    </div>
  );
};
