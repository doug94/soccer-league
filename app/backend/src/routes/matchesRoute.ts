import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import validateToken from '../middlewares/tokenValidation';
import matchValidation from '../middlewares/matchValidation';
import MatchService from '../services/matchService';

const router = Router();

const matchService = new MatchService();

const matchesController = new MatchesController(matchService);

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

router.patch('/:id', matchesController.editMatch);

export default router;
