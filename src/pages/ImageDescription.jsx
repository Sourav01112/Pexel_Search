import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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


  //   console.log(id);
//   console.log("@@store", individual);


  useEffect(() => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      dispatch(getSingleProductDetails(id));
    }, 1000);
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>Welcome to Individual Detail</h1>

          <LazyLoadImage
            src={individual?.src?.original}
            width={700}
            height={500}
            effect="blur"
          />

          <Details>
            <p>Photographer Name: {individual?.photographer}</p>
            <p>Photographer ID: {individual?.photographer_id}</p>
            <p>Original Height: {individual?.height}</p>
            <p>Original Width: {individual?.width}</p>
            <p>Photographer URL: {individual?.photographer_url}</p>
          </Details>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
`;

const Details = styled.div`
  margin-top: 20px;
  text-align: center;
`;
