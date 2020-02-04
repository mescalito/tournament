import l from '../../common/logger';
import db from './ranks.db.service';

class RanksService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return db.getAll();
  }
}

export default new RanksService();
