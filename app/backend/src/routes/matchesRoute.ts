import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();

const matchesController = new MatchesController();

router.get(
  '/',
  matchesController.retrieveAllMatches,
  matchesController.retrieveInProgressMatches,
  matchesController.retrieveFinishedMatches,
);

export default router;
