import { ACTION_SET_CURRENT_COMPETITION_ID } from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_CURRENT_COMPETITION_ID:
      return action.currentCompetitionId;
    default:
      return state;
  }
};
