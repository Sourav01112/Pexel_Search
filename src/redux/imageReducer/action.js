import {
  SEARCH_REQUEST,
  SEARCH_FAILURE,
  GET_SEARCH_SUCCESS,
} from "./actionTypes";
import axios from "axios";

const apiKey = "25zf2otXNgXmAK1dFaVgHaY4DXaksm442rGtmj5ds4qfhsMJeV3VFB6i";

export const getSearchResult = (query, page, paramObject) => (dispatch) => {
  dispatch({ type: SEARCH_REQUEST });
  axios
    .get(
      `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
      {
        headers: {
          Authorization: apiKey,
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
