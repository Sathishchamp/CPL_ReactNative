import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { VIEW_NAV_HOME } from '../constants/viewNames';
import HomeNavigator from './HomeNavigator';
import TeamsNavigator from './TeamsNavigator';
import NewsNavigator from './NewsNavigator';
import VideosNavigator from './VideosNavigator';
import MoreNavigator from './MoreNavigator';

const MainNavigator = createSwitchNavigator(
  {
    homeNavigator: {
      screen: HomeNavigator,
      navigationOptions: {
        header: null
      }
    },
    teamsNavigator: {
      screen: TeamsNavigator,
      navigationOptions: {
        header: null
      }
    },
    newsNavigator: {
      screen: NewsNavigator,
      navigationOptions: {
        header: null
      }
    },
    videosNavigator: {
      screen: VideosNavigator,
      navigationOptions: {
        header: null
      }
    },
    moreNavigator: {
      screen: MoreNavigator,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: VIEW_NAV_HOME
  }
);

export default createAppContainer(MainNavigator);
