import { ACTION_SET_PLAYER_PROFILE_URL } from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_PLAYER_PROFILE_URL:
      return action.playerProfileUrl;
    default:
      return state;
  }
};
