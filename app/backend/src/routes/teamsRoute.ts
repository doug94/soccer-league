import { Router } from 'express';
import TeamsService from '../services/teamsService';
import TeamsController from '../controllers/teamsController';

const router = Router();

const teamsService = new TeamsService();

const teamsController = new TeamsController(teamsService);

router.get('/', teamsController.retrieveAllTeams);

router.get('/:id', teamsController.retrieveTeamById);

export default router;
