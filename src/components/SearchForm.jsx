import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSearchResult } from "../redux/imageReducer/action";
import { Flip, Slide, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/SearchForm.css";

export const SearchForm = ({ query, setQuery, page, setPage }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) {
      toast.error("Please enter a search query");
      return;
    }
    setQuery("");

    dispatch(getSearchResult(query, page, setPage));
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    dispatch(getSearchResult(query));
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        className="inputStyle"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDownHandler}
        placeholder="Search images..."
      />{" "}
      <Button type="submit">Search</Button>
      {/* <Button type="submit">Search</Button> */}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  width: 100%;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
`;
