import l from '../../common/logger';
import db from './games.db.service';

class GamesService {
  create(game) {
    l.info(`${this.constructor.name}.create()`);
    return db.insert(game);
  }

  all() {
    l.info(`${this.constructor.name}.all()`);
    return db.getAll();
  }
}

export default new GamesService();
