import { ACTION_SET_LIVE_MATCH_DATA } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_LIVE_MATCH_DATA:
      return action.liveMatchData;
    default:
      return state;
  }
};
