import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import validateToken from '../middlewares/tokenValidation';
import matchValidation from '../middlewares/matchValidation';

const router = Router();

const matchesController = new MatchesController();

const { validateEqualTeams, validateAbsentTeam } = matchValidation;

router.get(
  '/',
  matchesController.retrieveAllMatches,
  matchesController.retrieveInProgressMatches,
  matchesController.retrieveFinishedMatches,
);

router.post(
  '/',
  validateToken,
  validateEqualTeams,
  validateAbsentTeam,
  matchesController.saveMatch,
);

router.patch('/:id/finish', matchesController.finishMatch);

export default router;
