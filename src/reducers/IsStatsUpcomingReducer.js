import { ACTION_SET_IS_STATS_UPCOMING } from '../constants/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case ACTION_SET_IS_STATS_UPCOMING:
      return action.isStatsUpcoming;
    default:
      return state;
  }
};
