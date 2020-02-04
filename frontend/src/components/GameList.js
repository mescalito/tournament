import React from "react";
import { connect } from "react-redux";
import { fetchGames } from "../redux/actions";
import Game from "./Game";

class GameList extends React.Component {
  componentWillMount() {
    const { fetchGames } = this.props;
    fetchGames();
  }
  render() {
    const { games } = this.props;
    return (
      <div>
        <h1>List of Games</h1>
        <ul className="game-list">
          {
            games && games.length
            ? games.map((game, index) => {
                return <Game key={`game-${game.id}`} game={game} />;
              })
            : "No games, yay!"
          }
        </ul>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { games:state.games.games };
};

const mapDispatchToProps = { fetchGames };

export default connect(mapStateToProps,mapDispatchToProps)(GameList);
