class Rank {
  static getAllRanksSQL() {
    let sql = `select name, won, lost, tied, (3*won + 1*tied) as points \
                from ( \
                  select p.name, count(distinct g1.id) as 'won',count(distinct g2.id) as 'lost', count(distinct g3.id) as 'tied' \
                  from players p \
                  left join games g1 on p.id = g1.player1id and g1.player1Score > g1.player2Score \
                  left join games g2 on p.id = g2.player2id and g2.player1Score > g2.player2Score \
                  left join games g3 on (p.id = g3.player1id or p.id = g3.player2id) and g3.player1Score = g3.player2Score \
                  group by p.id \
                  ) results \
              order by points desc`;
    return sql;
  }
}

export default Rank;
