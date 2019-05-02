import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Matches from '../views/Matches';
import { VIEW_MATCHES } from '../constants/viewNames';

const MatchesNavigator = createStackNavigator(
  {
    matches: {
      screen: Matches,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: VIEW_MATCHES
  }
);

export default createAppContainer(MatchesNavigator);
