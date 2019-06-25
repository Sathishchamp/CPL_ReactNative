import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';
import VideoReducer from './VideoReducer';
import LiveMatchReducer from './LiveMatchReducer';
import CompetitionUrlReducer from './CompetitionUrlReducer';
import CompetitionIdReducer from './CompetitionIdReducer';
import TeamsReducer from './TeamsReducer';
import PlayerProfileUrlReducer from './PlayerProfileUrl';
import LiveMatchIndexReducer from './LiveMatchIndexReducer';
import CurrentCompetitionIdReducer from './CurrentCompetitionIdReducer';
import UpcomingCompetitionIdReducer from './UpcomingCompetitionIdReducer';
import ServerUrlReducer from './ServerUrlReducer';

export default combineReducers({
  news: NewsReducer,
  videos: VideoReducer,
  liveMatchData: LiveMatchReducer,
  liveMatchIndex: LiveMatchIndexReducer,
  competitionUrl: CompetitionUrlReducer,
  competitionId: CompetitionIdReducer,
  teams: TeamsReducer,
  playerProfileUrl: PlayerProfileUrlReducer,
  currentCompetitionId: CurrentCompetitionIdReducer,
  upcomingCompetitionId: UpcomingCompetitionIdReducer,
  serverUrl: ServerUrlReducer
});
