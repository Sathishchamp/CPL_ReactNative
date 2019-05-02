import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Videos from '../views/Videos';
import { VIEW_VIDEOS } from '../constants/viewNames';

const VideosNavigator = createStackNavigator(
  {
    videos: {
      screen: Videos,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: VIEW_VIDEOS
  }
);

export default createAppContainer(VideosNavigator);
