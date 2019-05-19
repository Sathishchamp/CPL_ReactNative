import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';
import VideoReducer from './VideoReducer';
import LiveMatchReducer from './LiveMatchReducer';
import CompetitionUrlReducer from './CompetitionUrlReducer';
import CompetitionIdReducer from './CompetitionIdReducer';

export default combineReducers({
  news: NewsReducer,
  videos: VideoReducer,
  liveMatchData: LiveMatchReducer,
  competitionUrl: CompetitionUrlReducer,
  competitionId: CompetitionIdReducer
});
