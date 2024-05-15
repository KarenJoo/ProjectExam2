import { combineReducers } from 'redux';
import avatarReducer from './avatarReducer';


const rootReducer = combineReducers({
    avatar: avatarReducer,
  });
  
  export default rootReducer;