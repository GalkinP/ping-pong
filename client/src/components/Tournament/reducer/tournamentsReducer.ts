import type { Action } from './action';
import type { State } from './reducerType';

export const init = {
  tournaments: [],
};

export const tournamentsReducer = (state: State = init, action: Action): State => {
  switch (action.type) {
    case 'tournaments/set':
      return { ...state, tournaments: action.payload };
    case 'tournaments/add':
      return { ...state, tournaments: [...state.tournaments, action.payload] };
    case 'tournaments/remove':
      return {
        ...state,
        tournaments: state.tournaments.filter((tournament) => tournament.id !== action.payload),
      };
    case 'tournaments/players/add':
      return {
        ...state,
        tournaments: state.tournaments.map((tournament) => {
          if (tournament.id === action.payload.tournamentId) {
            return {
              ...tournament,
              Players: [...tournament.Players, action.payload],
            };
          }
          return tournament;
        }),
      };
    case 'tournaments/players/remove':
      return {
        ...state,
        tournaments: state.tournaments.map((tournament) => {
          if (tournament.id === action.payload.id) {
            return {
              ...tournament,
              Players: tournament.Players.filter((player) => player.id !== action.payload.playerId),
            };
          }
          return tournament;
        }),
      };
    case 'tournaments/team/update':
      return {
        ...state,
        tournaments: state.tournaments.map((tournament) => {
          if (tournament.id === action.payload.id) {
            return {
              ...tournament,
              Players: tournament.Players.map((player) => {
                if (player.id === action.payload.playerId) {
                  return { ...player, teamId: action.payload.teamId };
                }
                return player;
              }),
            };
          }
          return tournament;
        }),
      };
    case 'tournaments/players/update':
      return {
      
        ...state,
        tournaments: state.tournaments.map((tournament) => {
          if (tournament.id === action.payload.id) {
            return {
              ...tournament,
              Players: tournament.Players.map((player) => {
                if (player.id === action.payload.playerId) {
                  return { ...player, isWin: !player.isWin };
                }
                return player;
              })
            }
          }
          return tournament
        })
      }
      case 'tournaments/player/change':
        return {
          ...state,
          tournaments: state.tournaments.map((tournament) => {
            if (tournament.id === action.payload.id) {
              return {
                ...tournament,
                Players: tournament.Players.map((player) => {
                  if (player.id === action.payload.player.id) {
                    return action.payload.player
                  }
                  return player
                })
              }
            }
            return tournament
          })
        }
    default:
      return state;
  }
};
