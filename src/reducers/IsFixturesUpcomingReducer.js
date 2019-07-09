import { ACTION_SET_IS_FIXTURES_UPCOMING } from '../constants/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case ACTION_SET_IS_FIXTURES_UPCOMING:
      return action.isFixturesUpcoming;
    default:
      return state;
  }
};
