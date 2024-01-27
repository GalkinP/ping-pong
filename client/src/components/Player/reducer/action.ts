import type { Player, PlayerId } from '../type';

export type Action =
  | { type: 'players/set'; payload: Player[] }
  | { type: 'players/add'; payload: Player }
  | { type: 'players/remove'; payload: PlayerId }
  | { type: 'players/update'; payload: PlayerId}
  | { type: 'players/change'; payload: Player };
