import { ACTION_SET_POINTS_TABLE } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_POINTS_TABLE:
      return action.pointsTable;
    default:
      return state;
  }
};
