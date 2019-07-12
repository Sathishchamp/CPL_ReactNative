import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import More from '../views/More';
import Tickets from '../views/Tickets';
import Sponsors from '../views/Sponsors';
import { VIEW_MORE } from '../constants/viewNames';
import {
  TICKETS,
  SPONSORS,
  RESULTS,
  FIXTURES,
  STATS,
  PODCASTS
} from '../constants/strings';
import commonStyles from '../commons/styles';
import Results from '../views/Results';
import Fixtures from '../views/Fixtures';
import Stats from '../views/Stats';
import Podcasts from '../views/Podcasts';

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
    },
    fixtures: {
      screen: Fixtures,
      navigationOptions: {
        title: FIXTURES,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    stats: {
      screen: Stats,
      navigationOptions: {
        title: STATS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    podcasts: {
      screen: Podcasts,
      navigationOptions: {
        title: PODCASTS,
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
