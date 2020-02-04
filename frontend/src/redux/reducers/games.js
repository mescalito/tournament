import {ADD_GAME, FETCH_GAMES} from "../actionTypes";

const initialState = {
  games: []
};

export default function(state = initialState, action) {  
  switch (action.type) {
    case ADD_GAME: {
      return {
        games: [...state.games, action.payload[0]]
      };
    }
    case FETCH_GAMES: {
      return {
        games: action.payload
      };
    }
    default:
      return state;
  }
}
