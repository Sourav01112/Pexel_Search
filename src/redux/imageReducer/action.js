import {
  SEARCH_REQUEST,
  SEARCH_FAILURE,
  GET_PRODUCT_DETAILS,
  GET_SEARCH_SUCCESS,
} from "./actionTypes";
import axios from "axios";


export const getSearchResult = (query, page, paramObject) => (dispatch) => {
  dispatch({ type: SEARCH_REQUEST });

  axios
    .get(
      `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
      {
        headers: {
          Authorization: import.meta.env.VITE_API_Key,
        },
      },
      paramObject
    )
    .then((res) => {
      console.log("res", res);
      dispatch({
        type: GET_SEARCH_SUCCESS,
        payload: {
          data: res.data.photos,
          next: res.next,
          totalCount: res.data.total_results,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: SEARCH_FAILURE });
    });
};

export const getSingleProductDetails = (id) => (dispatch) => {
  dispatch({ type: SEARCH_REQUEST });

  return axios
    .get(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: import.meta.env.VITE_API_Key,
      },
    })
    .then((res) => {
      console.log("Detail Response", res);
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
