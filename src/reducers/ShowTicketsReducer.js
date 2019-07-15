import { ACTION_SET_SHOW_TICKETS } from '../constants/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case ACTION_SET_SHOW_TICKETS:
      return action.showTickets;
    default:
      return state;
  }
};
