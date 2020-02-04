import l from '../../../common/logger';
import RanksService from '../../services/ranks.service';

export class Controller {
  all(req, res) {
    RanksService.all()
      .then(r => res.json(r))
      .catch(e => l.info(`${this.constructor.name}.create: ${e}`));
  }
}
export default new Controller();
