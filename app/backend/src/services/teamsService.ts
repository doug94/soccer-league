import ITeam from '../interfaces/ITeam';
import Teams from '../database/models/TeamsModel';

class TeamsService {
  public getTeams = async (): Promise<ITeam[]> => Teams.findAll();

  public getTeamById = async (id: number): Promise<ITeam | null> => Teams.findByPk(id);
}

export default TeamsService;
