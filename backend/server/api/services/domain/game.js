class Game {
  constructor(firstPlayer, secondPlayer, firstPlayerScore, secondPlayerScore) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.firstPlayerScore = firstPlayerScore;
    this.secondPlayerScore = secondPlayerScore;
  }

  getAddGameSQL() {
    /*
        Payload Example: 
            player1: Charlie
            player2: Nico
            player1Score: 5
            player2Score: 9
        Stored procedure:
        - Check if the player with name "Charlie" already exists, if not then create it.
        - Then grab new created ID
        - Check if the player with name "Sofia" already exists, if already exist then grab Sofia's ID
        - Insert into Games
        IMPORTANT: the player with the highest score is saved into column games.player1id. In other words, the column Player1Id will always contains the winners
    */
    let sql = `CALL resultsGame('${this.firstPlayer}','${this.secondPlayer}', ${this.firstPlayerScore}, ${this.secondPlayerScore});`;
    return sql;
  }

  static getAllGamesSQL() {
    let sql = `select g.id, p1.name player1name, p2.name player2name, g.player1Score, g.player2Score, g.date \
                from games g \
                inner join players p1 on g.player1id = p1.id \
                inner join players p2 on g.player2id = p2.id`;
    return sql;
  }
}

export default Game;
