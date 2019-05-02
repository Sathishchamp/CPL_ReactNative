import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { VIEW_HOME } from '../constants/viewNames';
import Home from '../views/Home';
import NewsView from '../views/NewsView';
import { NEWS } from '../constants/strings';
import commonStyles from '../commons/styles';

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
    }
  },
  {
    initialRouteName: VIEW_HOME
  }
);

export default createAppContainer(HomeNavigator);
