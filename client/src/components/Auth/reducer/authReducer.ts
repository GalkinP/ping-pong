import type { Action } from './action';
import type { StateAuth } from './reducerType';

const stateAuth: StateAuth = {
  user: undefined,
};

const authReducer = (state: StateAuth = stateAuth, action: Action): StateAuth => {
  switch (action.type) {
    case 'auth/auth':
      return {
        ...state,
        user: action.payload,
      };
    case 'auth/userCheck':
      return {
        ...state,
        user: action.payload,
      };
    case 'auth/logout':
      return {
        ...state,
        user: undefined,
      };
    default:
      return state;
  }
};
export default authReducer;
