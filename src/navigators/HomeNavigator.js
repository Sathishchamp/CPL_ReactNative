import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { VIEW_HOME } from '../constants/viewNames';
import { NEWS, MTATCH_CENTER } from '../constants/strings';
import commonStyles from '../commons/styles';
import Home from '../views/Home';
import NewsView from '../views/NewsView';
import MatchCenter from '../views/MatchCenter';

const HomeNavigator = createStackNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: {
        header: null
        // gesturesEnabled: false
      }
    },
    homeNewsView: {
      screen: NewsView,
      navigationOptions: {
        title: NEWS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    matchCenter: {
      screen: MatchCenter,
      navigationOptions: {
        title: MTATCH_CENTER,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    }
  },
  {
    initialRouteName: VIEW_HOME
  }
);

export default createAppContainer(HomeNavigator);
