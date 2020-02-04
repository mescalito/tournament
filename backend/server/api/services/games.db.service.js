import l from '../../common/logger';
import db from '../../config/dbconfig';
import Game from './domain/game';
import util from 'util';

class GamesDatabase {
  constructor() {
    this._data = [];
    this._dbQueryPromise = util.promisify(db.query);
  }

  getAll() {
    return Promise.resolve(
      this._dbQueryPromise(Game.getAllGamesSQL())
        .then(Games => {
          return Games;
        })
        .catch(e =>
          l.info(
            `${this.constructor.name}.dbQueryPromise().getAllGamesSQL: ${e}`
          )
        )
    );
  }

  insert(data) {
    let game = new Game(
      data.firstPlayer,
      data.secondPlayer,
      data.firstPlayerScore,
      data.secondPlayerScore
    );

    /* promisify db.query sync function
    let dbQueryPromise = (...args) => {
      return new Promise((resolve, reject) => {
        db.query(...args, (err, newGame) => {
          if (err) return reject(err);
          resolve(newGame);
        });
      });
    };
    */
    return Promise.resolve(
      this._dbQueryPromise(game.getAddGameSQL())
        .then(newGame => {
          this._data.push(newGame[0]);
          return newGame[0];
        })
        .catch(e =>
          l.info(
            `${this.constructor.name}.dbQueryPromise().getAddGameSQL: ${e}`
          )
        )
    );
  }
}

export default new GamesDatabase();
