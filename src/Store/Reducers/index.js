import {combineReducers} from 'redux';
import {FetchAllUsersDataReducer, UserListReducer} from './getthedataReducer';

export default rootReducers = combineReducers({
  UserData: FetchAllUsersDataReducer,
  ListOfUser: UserListReducer,
});
