import { ACTION_SET_COMPETITION_URL } from '../constants/actionTypes';

export default (state = '', action) => {
  switch (action.type) {
    case ACTION_SET_COMPETITION_URL:
      return action.competitionUrl;
    default:
      return state;
  }
};
