import { ACTION_SET_UPCOMING_COMPETITION_ID } from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_UPCOMING_COMPETITION_ID:
      return action.upcomingCompetitionId;
    default:
      return state;
  }
};
