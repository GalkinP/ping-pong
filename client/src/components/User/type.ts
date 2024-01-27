
export type User = {
  id: number;
  name: string;
  avatar: string;
  wins: number;
  losses: number;
  isAdmin: boolean;
};

export type UserId = User['id'];
