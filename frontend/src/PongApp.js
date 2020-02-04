import React from "react";
import AddGame from "./components/AddGame";
import GameList from "./components/GameList";
import RankList from "./components/RankList";
import "./styles.css";

export default function PongApp() {
  return (
    <div className="pong-app">
      <h1>Ping Pong Games</h1>
      <AddGame />
      <GameList />
      <RankList />
    </div>
  );
}
