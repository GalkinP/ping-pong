import type{ Action } from "./action"
import type{ State } from "./reducerType"

export const init ={
    users: []}

    export const usersReducer=(state:State=init, action:Action):State=>{
        switch(action.type){
            case "users/set":
                return {...state, users: action.payload}
            case "users/award":
                return {...state, users: state.users.map((user)=> user.id === action.payload ? {...user, wins: user.wins + 1} : user)}
            case "users/loose":
                return {...state, users: state.users.map((user)=> user.id === action.payload ? {...user, losses: user.losses + 1} : user)}
            case 'user/add':
                return{...state, users: [...state.users, action.payload]}
            default:
                return state
        }
    }