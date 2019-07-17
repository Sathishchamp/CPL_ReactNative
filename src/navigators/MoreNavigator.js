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
import BackButton from '../components/BackButton';

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
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    },
    tickets: {
      screen: Tickets,
      navigationOptions: {
        title: TICKETS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    },
    sponsors: {
      screen: Sponsors,
      navigationOptions: {
        title: SPONSORS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    },
    fixtures: {
      screen: Fixtures,
      navigationOptions: {
        title: FIXTURES,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    },
    stats: {
      screen: Stats,
      navigationOptions: {
        title: STATS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    },
    statsDetails: {
      screen: StatsDetails,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      })
    },
    statsPlayerDetail: {
      screen: StatsPlayerDetail,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      })
    },
    podcasts: {
      screen: Podcasts,
      navigationOptions: {
        title: PODCASTS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    },
    archives: {
      screen: Archives,
      navigationOptions: {
        title: ARCHIVES,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    },
    archiveDetails: {
      screen: ArchiveDetails,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      })
    },
    archiveMatchCenter: {
      screen: MatchCenter,
      navigationOptions: {
        title: MTATCH_CENTER,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    },
    pointsTable: {
      screen: PointsTable,
      navigationOptions: {
        title: POINTS_TABLE,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    },
    socialHub: {
      screen: SocialHub,
      navigationOptions: {
        title: SOCIAL_HUB,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    }
  },
  {
    initialRouteName: VIEW_MORE
  }
);

export default createAppContainer(MoreNavigator);
