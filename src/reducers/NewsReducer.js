import { ACTION_SET_NEWS_DATA } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_NEWS_DATA:
      return action.newsData;
    default:
      return state;
  }
};
