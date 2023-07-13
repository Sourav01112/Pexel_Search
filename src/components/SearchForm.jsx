import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getSearchResult } from "../redux/imageReducer/action";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/SearchForm.css";

export const SearchForm = ({ query, setQuery, paramsObj }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // form Submission

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      toast.error("Please enter a search query");
      return;
    }
    setQuery("");

    dispatch(getSearchResult(query));
  };

  // Search on Enter
  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  //Applying Debouncing on search with useSearchParam
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const paramsObj = {
        params: {
          q: query && query,
        },
      };
      setSearchParams(paramsObj.params);

      dispatch(getSearchResult(query));
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          className="inputStyle"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDownHandler}
          placeholder="Perform image searches using keywords or phrases, including alphabets."
        />
      </Form>
      <P>
        Perform image searches using keywords or phrases, including alphabets.
      </P>
    </div>
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
  margin-bottom: -20px;
`;
const P = styled.p`
  color: rgb(189, 189, 189);
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
