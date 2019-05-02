import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import More from '../views/More';
import { VIEW_MORE } from '../constants/viewNames';

const MoreNavigator = createStackNavigator(
  {
    more: {
      screen: More,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: VIEW_MORE
  }
);

export default createAppContainer(MoreNavigator);
