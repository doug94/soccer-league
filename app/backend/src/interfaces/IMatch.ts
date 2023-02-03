import ITeam from './ITeam';

export interface IMatchDb {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export default interface IMatch extends IMatchDb {
  homeTeam: ITeam,
  awayTeam: ITeam,
}
