import type { Player, PlayerId } from '../../Player/type';
import type { Tournament, TournamentId } from '../type';

export type Action =
  | { type: 'tournaments/set'; payload: Tournament[] }
  | { type: 'tournaments/add'; payload: Tournament }
  | { type: 'tournaments/remove'; payload: TournamentId }
  | { type: 'tournaments/players/add'; payload: Player }
  | { type: 'tournaments/players/remove'; payload: { playerId: PlayerId; id: TournamentId } }
  | {
      type: 'tournaments/team/update';
      payload: { teamId: number; id: TournamentId; playerId: PlayerId };
    }
  | { type: 'tournaments/players/update'; payload: { playerId: PlayerId; id: TournamentId } }
  | { type: 'tournaments/player/change'; payload: { id: TournamentId; player: Player } };
