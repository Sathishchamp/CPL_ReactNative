import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';
import VideoReducer from './VideoReducer';
import LiveMatchReducer from './LiveMatchReducer';

export default combineReducers({
  news: NewsReducer,
  videos: VideoReducer,
  liveMatchData: LiveMatchReducer
});
