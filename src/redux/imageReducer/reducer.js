import {
  SEARCH_REQUEST,
  SEARCH_FAILURE,
  GET_SEARCH_SUCCESS,
  GET_PRODUCT_DETAILS,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  images: [],
  nextPage: "",
  totalCount: 0,
  individual: [],
};

export const reducer = (state = initialState, { type, payload }) => {
 
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
    case GET_PRODUCT_DETAILS: {
      return {
        ...state,
        isLoading: false,
        individual: payload.data,
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
