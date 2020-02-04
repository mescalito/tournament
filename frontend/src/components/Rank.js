import React from "react";

const Rank = ({ rank }) => (
  <li>
    <span>
    {rank.name}: Wins {rank.won}, Losses {rank.lost}, Ties {rank.tied}, Total of Point: <b>{rank.points}</b></span>
  </li>
);

export default Rank;
