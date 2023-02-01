import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.retrieveAllTeams);

router.get('/:id', teamsController.retrieveTeamById);

export default router;
