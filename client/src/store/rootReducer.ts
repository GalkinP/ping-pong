import { combineReducers } from 'redux';
import { playersReducer } from '../components/Player/reducer/playersReducer';
import { tournamentsReducer } from '../components/Tournament/reducer/tournamentsReducer';
import { usersReducer } from '../components/User/reducer/usersReducer';
import authReducer from '../components/Auth/reducer/authReducer';

const rootReducer = combineReducers({
  user: authReducer,
  players: playersReducer,
  tournaments: tournamentsReducer,
  users: usersReducer,
});

export default rootReducer;
