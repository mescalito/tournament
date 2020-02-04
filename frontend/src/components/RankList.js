import React from "react";
import { connect } from 'react-redux';
import { fetchRanks } from "../redux/actions";
import Rank from "./Rank";


class RankList extends React.Component {
  componentWillMount() {
    const { fetchRanks } = this.props;
    fetchRanks();
  }
  render() {
    const { ranks } = this.props;
    return (
      <div>
        <h1>Leading Board</h1>
        <ul className="game-list">
          {
            ranks && ranks.length
            ? ranks.map((rank, index) => {
                return <Rank key={`rank-${rank.name}`} rank={rank} />;
              })
            : "No players, yay!"
          }
        </ul>
        <span>
          Point System: win=3,loss=0,tie=1
        </span>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { ranks:state.ranks.ranks };
};

const mapDispatchToProps = { fetchRanks };

export default connect(mapStateToProps, mapDispatchToProps)(RankList);
