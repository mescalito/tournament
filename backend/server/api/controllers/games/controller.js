import l from '../../../common/logger';
import GamesService from '../../services/games.service';

export class Controller {
  create(req, res) {
    GamesService.create(req.body)
      .then(r => {
        res
          .status(201)
          .location(`/api/v1/games/${r.id}`)
          .json(r);
      })
      .catch(e => l.info(`Controller.create: ${e}`));
  }

  all(req, res) {
    GamesService.all().then(r => res.json(r));
  }
}
export default new Controller();
