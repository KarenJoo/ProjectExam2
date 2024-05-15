import { combineReducers } from 'redux';
import avatarReducer from './avatarReducer';
import authReducer from './authReducer'


const rootReducer = combineReducers({
    avatar: avatarReducer,
    auth: authReducer,
  });
  
  export default rootReducer;