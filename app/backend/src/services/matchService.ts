import { Op } from 'sequelize';
import IMatch from '../interfaces/IMatch';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

class MatchService {
  private _homeTeamAlias: string;
  private _awayTeamAlias: string;

  constructor() {
    this._homeTeamAlias = 'matches.home_team_id';
    this._awayTeamAlias = 'matches.away_team_id';
  }

  public getAllMatches = async (): Promise<IMatch[]> => {
    const query = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', on: { id: { [Op.col]: this._homeTeamAlias } } },
        { model: Teams, as: 'awayTeam', on: { id: { [Op.col]: this._awayTeamAlias } } },
      ],
    });
    return query as unknown as IMatch[];
  };

  public getInProgressMatches = async (): Promise<IMatch[]> => {
    const query = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', on: { id: { [Op.col]: this._homeTeamAlias } } },
        { model: Teams, as: 'awayTeam', on: { id: { [Op.col]: this._awayTeamAlias } } },
      ],
      where: { inProgress: true },
    });
    return query as unknown as IMatch[];
  };

  public getFinishedMatches = async (): Promise<IMatch[]> => {
    const query = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', on: { id: { [Op.col]: this._homeTeamAlias } } },
        { model: Teams, as: 'awayTeam', on: { id: { [Op.col]: this._awayTeamAlias } } },
      ],
      where: { inProgress: false },
    });
    return query as unknown as IMatch[];
  };
}

export default MatchService;
