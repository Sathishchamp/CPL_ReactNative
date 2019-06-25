import { ACTION_SET_SEVER_URL } from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_SEVER_URL:
      return action.serverUrl;
    default:
      return state;
  }
};
