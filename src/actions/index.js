import {
  ACTION_SET_NEWS_DATA,
  ACTION_SET_VIDEO_DATA,
  ACTION_SET_LIVE_MATCH_DATA,
  ACTION_SET_COMPETITION_URL,
  ACTION_SET_COMPETITION_ID
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
