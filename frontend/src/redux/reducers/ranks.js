import {FETCH_RANKS } from "../actionTypes";

const initialState = {
  ranks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_RANKS: {
      console.log(action.payload)
      return {
        ...state,
        ranks: [...action.payload]
      };
    }
    default:
      return state;
  }
}
