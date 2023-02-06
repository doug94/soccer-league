import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import validateToken from '../middlewares/tokenValidation';

const router = Router();

const matchesController = new MatchesController();

router.get(
  '/',
  matchesController.retrieveAllMatches,
  matchesController.retrieveInProgressMatches,
  matchesController.retrieveFinishedMatches,
);

router.post('/', validateToken, matchesController.saveMatch);

router.patch('/:id/finish', matchesController.finishMatch);

export default router;
