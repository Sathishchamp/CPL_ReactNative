import {
  ACTION_SET_NEWS_DATA,
  ACTION_SET_VIDEO_DATA
} from '../constants/actionTypes';

export const setNewsData = newsData => ({
  type: ACTION_SET_NEWS_DATA,
  newsData
});

export const setVideoData = videoData => ({
  type: ACTION_SET_VIDEO_DATA,
  videoData
});
