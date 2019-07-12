import {
  ACTION_SET_NEWS_DATA,
  ACTION_SET_VIDEO_DATA,
  ACTION_SET_LIVE_MATCH_DATA,
  ACTION_SET_COMPETITION_URL,
  ACTION_SET_COMPETITION_ID,
  ACTION_SET_TEAMS,
  ACTION_SET_PLAYER_PROFILE_URL,
  ACTION_SET_LIVE_MATCH_INDEX,
  ACTION_SET_CURRENT_COMPETITION_ID,
  ACTION_SET_UPCOMING_COMPETITION_ID,
  ACTION_SET_SEVER_URL,
  ACTION_SET_IS_FIXTURES_UPCOMING,
  ACTION_SET_IS_STATS_UPCOMING
} from '../constants/actionTypes';

export const setNewsData = newsData => ({
  type: ACTION_SET_NEWS_DATA,
  newsData
});

export const setVideoData = videoData => ({
  type: ACTION_SET_VIDEO_DATA,
  videoData
});

export const setLiveMatchData = liveMatchData => ({
  type: ACTION_SET_LIVE_MATCH_DATA,
  liveMatchData
});

export const setCompetitionUrl = competitionUrl => ({
  type: ACTION_SET_COMPETITION_URL,
  competitionUrl
});

export const setCompetitionId = competitionId => ({
  type: ACTION_SET_COMPETITION_ID,
  competitionId
});

export const setTeams = teams => ({
  type: ACTION_SET_TEAMS,
  teams
});

export const setPlayerProfileUrl = playerProfileUrl => ({
  type: ACTION_SET_PLAYER_PROFILE_URL,
  playerProfileUrl
});

export const setLiveMatchCardIndex = liveMatchCardIndex => ({
  type: ACTION_SET_LIVE_MATCH_INDEX,
  liveMatchCardIndex
});

export const setCurrentCompetitionId = currentCompetitionId => ({
  type: ACTION_SET_CURRENT_COMPETITION_ID,
  currentCompetitionId
});

export const setUpcomingCompetitionId = upcomingCompetitionId => ({
  type: ACTION_SET_UPCOMING_COMPETITION_ID,
  upcomingCompetitionId
});

export const setServerUrl = serverUrl => ({
  type: ACTION_SET_SEVER_URL,
  serverUrl
});

export const setIsFixturesUpcoming = isFixturesUpcoming => ({
  type: ACTION_SET_IS_FIXTURES_UPCOMING,
  isFixturesUpcoming
});

export const setIsStatsUpcoming = isStatsUpcoming => ({
  type: ACTION_SET_IS_STATS_UPCOMING,
  isStatsUpcoming
});
