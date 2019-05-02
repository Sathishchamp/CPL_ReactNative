import { ACTION_SET_NEWS_DATA } from '../constants/actionTypes';

export const setNewsData = newsData => ({
  type: ACTION_SET_NEWS_DATA,
  newsData
});
