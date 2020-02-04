import { SET_FILTER, ADD_GAME, FETCH_RANKS, FETCH_GAMES } from "./actionTypes";

// dispatchers

export const fetchGames = () => {
  return dispatch => {
    fetch('http://localhost:7000/api/v1/games')
      .then(res => res.json())
      .then(games => {
        dispatch({
          type: FETCH_GAMES,
          payload: games,
        })
      });
  };
};

export const fetchRanks = () => {
  return dispatch => {
    fetch('http://localhost:7000/api/v1/ranks')
      .then(res => res.json())
      .then(ranks =>
        dispatch({
          type: FETCH_RANKS,
          payload: ranks,
        })
      );
  };
};

export const addGame = game => {
  return dispatch => {
    fetch('http://localhost:7000/api/v1/games', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(game),
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: ADD_GAME,
          payload: data,
        })
      })
      .then(() => {
        // console.log('holaa11111')
        // console.log(dispatch(fetchRanks()))
        // console.log('holaa12222')
        dispatch(fetchRanks())
      });
  };
};

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
