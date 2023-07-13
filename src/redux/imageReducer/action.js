import axios from "axios";
import {
  SEARCH_REQUEST,
  SEARCH_FAILURE,
  GET_PRODUCT_DETAILS,
  GET_SEARCH_SUCCESS,
} from "./actionTypes";

export const getSearchResult = (query) => (dispatch) => {
  // validation for empty query
  if (!query) {
    dispatch({ type: SEARCH_FAILURE });
    return;
  }

  dispatch({ type: SEARCH_REQUEST });

  axios
    .get(
      `https://api.pexels.com/v1/search`,
      {
        headers: {
          Authorization: import.meta.env.VITE_API_Key,
        },
        params: {
          query: query,
          per_page: 80,
        },
      }

      // query
    )
    .then((res) => {
      console.log("res", res);
      dispatch({
        type: GET_SEARCH_SUCCESS,
        payload: {
          data: res.data.photos,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: SEARCH_FAILURE });
    });
};

export const getSingleProductDetails = (id) => async (dispatch) => {
  dispatch({ type: SEARCH_REQUEST });

  return axios
    .get(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: import.meta.env.VITE_API_Key,
      },
    })
    .then((res) => {
      // console.log("Detail Response", res);
      dispatch({
        type: GET_PRODUCT_DETAILS,
        payload: {
          data: res.data,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: SEARCH_FAILURE });
    });
};
