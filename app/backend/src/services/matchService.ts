import { Op } from 'sequelize';
import IMatch from '../interfaces/IMatch';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

class MatchService {
  public getAllMatches = async (): Promise<IMatch[]> => {
    // const query = await Matches.findAll();
    const query = await Matches.findAll({
      include: [
        { model: Teams, required: true, as: 'homeTeam', on: { id: { [Op.col]: 'matches.home_team_id' } } },
        { model: Teams, required: true, as: 'awayTeam', on: { id: { [Op.col]: 'matches.away_team_id' } } },
      ],
      logging: console.log,
    });
    return query as unknown as IMatch[];
  };
}

export default MatchService;
