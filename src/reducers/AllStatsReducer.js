import { ACTION_SET_ALL_STATS } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_ALL_STATS:
      return action.allStats;
    default:
      return state;
  }
};
