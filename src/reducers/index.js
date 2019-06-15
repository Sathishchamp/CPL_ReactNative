import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';
import VideoReducer from './VideoReducer';
import LiveMatchReducer from './LiveMatchReducer';
import CompetitionUrlReducer from './CompetitionUrlReducer';
import CompetitionIdReducer from './CompetitionIdReducer';
import TeamsReducer from './TeamsReducer';
import PlayerProfileUrlReducer from './PlayerProfileUrl';

export default combineReducers({
  news: NewsReducer,
  videos: VideoReducer,
  liveMatchData: LiveMatchReducer,
  competitionUrl: CompetitionUrlReducer,
  competitionId: CompetitionIdReducer,
  teams: TeamsReducer,
  playerProfileUrl: PlayerProfileUrlReducer
});
