import gamesRouter from './api/controllers/games/router';
import ranksRouter from './api/controllers/ranks/router';

export default function routes(app) {
  app.use('/api/v1/games', gamesRouter);
  app.use('/api/v1/ranks', ranksRouter);
}
