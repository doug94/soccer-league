import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import validateToken from '../middlewares/tokenValidation';
import validateMatch from '../middlewares/matchValidation';

const router = Router();

const matchesController = new MatchesController();

router.get(
  '/',
  matchesController.retrieveAllMatches,
  matchesController.retrieveInProgressMatches,
  matchesController.retrieveFinishedMatches,
);

router.post('/', validateToken, validateMatch, matchesController.saveMatch);

router.patch('/:id/finish', matchesController.finishMatch);

export default router;
