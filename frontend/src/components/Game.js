import React from 'react'
import moment from 'moment'

const Game = ({ game }) => (
  <li>
    <span>
    {moment(game.date).subtract({'hours': 5}).format("dd, MMM Do YY, h:mm:ss a")} -  
    {game.player1name}: {game.player1Score} vs. {game.player2name}: {game.player2Score}</span>
  </li>
);

export default Game;
