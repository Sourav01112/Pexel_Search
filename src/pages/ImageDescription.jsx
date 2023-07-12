import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleProductDetails } from "../redux/imageReducer/action";
import { SetLoading } from "../redux/loaderSlice";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styled from "styled-components";

export const ImageDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { individual, isLoading } = useSelector((store) => store.imageReducer);

  // to manage SetLoading and fetch
  useEffect(() => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      dispatch(getSingleProductDetails(id));
    }, 1000);
  }, []);

  return (
    <div>
      <Link to="/">
        <button>Go Back</button>
      </Link>
      <Container>
        <span>
          <h1>Welcome to Image Detail</h1>

          <LazyLoadImage
            src={individual?.src?.original}
            width={700}
            height={500}
            effect="blur"
            placeholder={
              <span>
                <LoadingSpinner />
              </span>
            }
          />

          <h3>Details</h3>
          <Details>
            <p>
              <span>Photographer Name </span> {individual?.photographer}
            </p>
            <p>
              <span>Photographer ID</span> {individual?.photographer_id}
            </p>
            <p>
              <span>Original Height</span> {individual?.height}
            </p>
            <p>
              <span>Original Width</span> {individual?.width}
            </p>
            <p>
              <span>Photographer URL</span> {individual?.photographer_url}
            </p>
          </Details>
        </span>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  padding-bottom: 50px;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  margin-top: 15px;

  h3 {
    color: rgb(66, 66, 66);
  }
`;

const Details = styled.div`
  margin-top: 20px;
  text-align: justify;
  width: 100%;
  padding-left: 48%;
  /* border: 2px solid red; */

  p {
    display: flex;
    justify-content: right;
    flex-direction: column;
    color: black;
    font-size: 17px;
    margin-bottom: 10px;
  }
  span {
    font-weight: 500;
    color: rgb(117, 117, 117);
    font-family: sans-serif;
    text-transform: uppercase;
  }
`;
