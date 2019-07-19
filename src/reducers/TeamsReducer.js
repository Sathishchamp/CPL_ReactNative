import { ACTION_SET_TEAMS } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_TEAMS:
      return action.teams;
    default:
      return state;
  }
};
