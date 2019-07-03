import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import More from '../views/More';
import Tickets from "../views/Tickets"
import Sponsors from "../views/Sponsors"
import { VIEW_MORE } from '../constants/viewNames';
import { TICKETS,SPONSORS, RESULTS } from '../constants/strings';
import commonStyles from '../commons/styles';
import Results from '../views/Results';
const MoreNavigator = createStackNavigator(
  {
    more: {
      screen: More,
      navigationOptions: {
        header: null
      }
    },
    results: {
      screen: Results,
      navigationOptions: {
        title: RESULTS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    tickets: {
      screen: Tickets,
      navigationOptions: {
        title: TICKETS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    sponsors: {
      screen: Sponsors,
      navigationOptions: {
        title: SPONSORS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    }
  },

  {
    initialRouteName: VIEW_MORE
  }
);

export default createAppContainer(MoreNavigator);
