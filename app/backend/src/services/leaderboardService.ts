import MatchService from './matchService';
import Teams from '../database/models/TeamsModel';
import ITeamStats from '../interfaces/ITeamStats';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';

class LeaderboardService {
  public getStatsFromAllTeams = async (): Promise<ITeamStats[]> => {
    const finishedMatches = await new MatchService().getFinishedMatches();
    const teams = await Teams.findAll();
    const leaderboard = this.generateLeaderboard(finishedMatches, teams);
    leaderboard.sort(this.sortLeaderboard);
    return leaderboard;
  };

  private sortLeaderboard = (a: ITeamStats, b: ITeamStats): number => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsOwn > b.goalsOwn) return 1;
    if (a.goalsOwn < b.goalsOwn) return -1;
    return 0;
  };

  private generateLeaderboard = (matches: IMatch[], teams: ITeam[]): ITeamStats[] => (
    teams.map((team) => {
      const teamMatches = this.getTeamMatches(matches, team);
      const teamStats = {
        name: team.teamName,
        totalPoints: this.sumAll(this.getTeamPoints(teamMatches, team)),
        totalGames: teamMatches.length,
        totalVictories: this.getTeamVictories(teamMatches, team),
        totalDraws: this.getTeamDraws(teamMatches),
        totalLosses: this.getTeamLosses(teamMatches, team),
        goalsFavor: this.sumAll(this.getTeamGoalsFavor(teamMatches, team)),
        goalsOwn: this.sumAll(this.getTeamGoalsOwn(teamMatches, team)),
        goalsBalance: this.getTeamGoalsBalance(teamMatches, team),
        efficiency: this.getTeamEfficiency(teamMatches, team),
      };
      return teamStats;
    })
  );

  private getTeamDraws = (matches: IMatch[]): number => {
    let draws = 0;
    matches.forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) draws += 1;
    });
    return draws;
  };

  private getTeamVictories = (matches: IMatch[], team: ITeam): number => {
    let victories = 0;
    matches.forEach((match) => {
      if (match.awayTeam.teamName === team.teamName && match.awayTeamGoals > match.homeTeamGoals) {
        victories += 1;
      } else if (match.homeTeam.teamName === team.teamName
        && match.homeTeamGoals > match.awayTeamGoals) victories += 1;
    });
    return victories;
  };

  private getTeamLosses = (matches: IMatch[], team: ITeam): number => {
    let losses = 0;
    matches.forEach((match) => {
      if (match.awayTeam.teamName === team.teamName && match.awayTeamGoals < match.homeTeamGoals) {
        losses += 1;
      } else if (match.homeTeam.teamName === team.teamName
        && match.homeTeamGoals < match.awayTeamGoals) losses += 1;
    });
    return losses;
  };

  private getTeamPoints = (matches: IMatch[], team: ITeam): number[] => {
    const win = 3; const draw = 1; const loss = 0;
    const points = matches.map((match) => {
      if (match.awayTeam.teamName === team.teamName) {
        if (match.awayTeamGoals > match.homeTeamGoals) return win;
        if (match.awayTeamGoals < match.homeTeamGoals) return loss;
      } else {
        if (match.homeTeamGoals > match.awayTeamGoals) return win;
        if (match.homeTeamGoals < match.awayTeamGoals) return loss;
      } return draw;
    }) as number[];
    return points;
  };

  private getTeamMatches = (matches: IMatch[], team: ITeam): IMatch[] => (
    matches.filter((match) => (
      match.awayTeam.teamName === team.teamName || match.homeTeam.teamName === team.teamName))
  );

  private getTeamGoalsFavor = (matches: IMatch[], team: ITeam): number[] => (
    matches.map((match) => {
      if (match.awayTeam.teamName === team.teamName) return match.awayTeamGoals;
      return match.homeTeamGoals;
    })
  );

  private getTeamGoalsOwn = (matches: IMatch[], team: ITeam): number[] => (
    matches.map((match) => {
      if (match.awayTeam.teamName === team.teamName) return match.homeTeamGoals;
      return match.awayTeamGoals;
    })
  );

  private getTeamGoalsBalance = (matches: IMatch[], team: ITeam): number => {
    const goalsFavor = this.sumAll(this.getTeamGoalsFavor(matches, team));
    const goalsOwn = this.sumAll(this.getTeamGoalsOwn(matches, team));
    return goalsFavor - goalsOwn;
  };

  private getTeamEfficiency = (matches: IMatch[], team: ITeam): string => {
    const totalPoints = this.sumAll(this.getTeamPoints(matches, team));
    const totalGames = matches.length;
    let efficiency = totalPoints / (totalGames * 3);
    efficiency *= 100;
    return efficiency.toFixed(2);
  };

  private sumAll = (points: number[]): number => points.reduce((acc, cur) => acc + cur);
}

export default LeaderboardService;
