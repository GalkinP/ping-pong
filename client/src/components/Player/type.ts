

export type User = {
  id: number;
  name: string;
  avatar: string;
  wins: number;
  losses: number;
};

export type Player = {
  teamId: number;
  userId: number;
  id: number;
  User: User;
  tournamentId: number;
  isWin: boolean;
};

export type PlayerId =Player['id']
