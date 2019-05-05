import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';
import VideoReducer from './VideoReducer';

export default combineReducers({
  news: NewsReducer,
  videos: VideoReducer
});
