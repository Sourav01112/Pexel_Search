import React from "react";
import styled from "styled-components";

export const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <Spinner></Spinner>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.8;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  border: 4px solid #fff;
  height: 10px;
  width: 10px;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  border-radius: 50%;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
