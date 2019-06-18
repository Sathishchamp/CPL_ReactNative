import { ACTION_SET_LIVE_MATCH_INDEX } from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_LIVE_MATCH_INDEX:
      return action.liveMatchCardIndex;
    default:
      return state;
  }
};
