import { ACTION_SET_SHOW_FIXTURES } from '../constants/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case ACTION_SET_SHOW_FIXTURES:
      return action.showFixtures;
    default:
      return state;
  }
};
