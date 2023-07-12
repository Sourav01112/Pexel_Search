import {
  SEARCH_REQUEST,
  SEARCH_FAILURE,
  GET_SEARCH_SUCCESS,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  images: [],
  nextPage: "",
  totalCount: 0,
};

export const reducer = (state = initialState, { type, payload }) => {
  console.log("payload", payload);
  switch (type) {
    case SEARCH_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_SEARCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        images: payload.data,
        nextPage: payload.next,
        totalCount: payload.totalCount,
      };
    }
    case SEARCH_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};
