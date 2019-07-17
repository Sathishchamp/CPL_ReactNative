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
  PODCASTS,
  ARCHIVES,
  MTATCH_CENTER,
  POINTS_TABLE,
  SOCIAL_HUB
} from '../constants/strings';
import commonStyles from '../commons/styles';
import Results from '../views/Results';
import Fixtures from '../views/Fixtures';
import Stats from '../views/Stats';
import Podcasts from '../views/Podcasts';
import StatsDetails from '../views/StatsDetails';
import StatsPlayerDetail from '../views/StatsPlayerDetail';
import Archives from '../views/Archives';
import ArchiveDetails from '../views/ArchiveDetails';
import MatchCenter from '../views/MatchCenter';
import PointsTable from '../views/PointsTable';
import SocialHub from '../views/SocialHub';

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
    statsDetails: {
      screen: StatsDetails,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      })
    },
    statsPlayerDetail: {
      screen: StatsPlayerDetail,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      })
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
    },
    archives: {
      screen: Archives,
      navigationOptions: {
        title: ARCHIVES,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    archiveDetails: {
      screen: ArchiveDetails,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      })
    },
    archiveMatchCenter: {
      screen: MatchCenter,
      navigationOptions: {
        title: MTATCH_CENTER,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    pointsTable: {
      screen: PointsTable,
      navigationOptions: {
        title: POINTS_TABLE,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    socialHub: {
      screen: SocialHub,
      navigationOptions: {
        title: SOCIAL_HUB,
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
