// Wire types for GET /leaderboard. 


export interface Leaderboard {
  username: string;
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number;
  userId: number;
}
