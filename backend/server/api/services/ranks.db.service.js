import l from '../../common/logger';
import db from '../../config/dbconfig';
import Rank from './domain/rank';
import util from 'util';

class RanksDatabase {
  constructor() {
    this._data = [];
  }

  getAll() {
    const dbQueryPromise = util.promisify(db.query);
    return Promise.resolve(
      dbQueryPromise(Rank.getAllRanksSQL())
        .then(Ranks => {
          return Ranks;
        })
        .catch(e =>
          l.info(
            `${this.constructor.name}.dbQueryPromise().getAddRankSQL: ${e}`
          )
        )
    );
  }
}

export default new RanksDatabase();
