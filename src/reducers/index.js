import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';

export default combineReducers({
  news: NewsReducer
});
