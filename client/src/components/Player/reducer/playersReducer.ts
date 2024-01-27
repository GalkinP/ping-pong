import type{ Action } from "./action"
import type{ State } from "./reducerType"

export const init ={
    players: []}

    export const playersReducer=(state:State=init, action:Action):State=>{
        switch(action.type){
            case "players/set":
                return {...state, players: action.payload}
            case "players/add":
                return {...state, players: [...state.players, action.payload]}
            case "players/remove":
                return {...state, players: state.players.filter((player)=> player.id !== action.payload)}
            case "players/update":
                return {...state, players: state.players.map((player)=> player.id === action.payload ? {...player, isWin: !player.isWin} : player)}
                case "players/change":
                    return {...state, players: state.players.map((player)=> player.id === action.payload.id ? {...player, ...action.payload} : player)}
            default:
                return state
        }
    }