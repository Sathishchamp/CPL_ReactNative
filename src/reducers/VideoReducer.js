import { ACTION_SET_VIDEO_DATA } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_VIDEO_DATA:
      return action.videoData;
    default:
      return state;
  }
};
