import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { VIEW_TEAMS } from '../constants/viewNames';
import Teams from '../views/Teams';
import TeamPlayers from '../views/TeamPlayers';
import { TEAM_DETAILS } from '../constants/strings';
import commonStyles from '../commons/styles';

const TeamsNavigator = createStackNavigator(
  {
    teams: {
      screen: Teams,
      navigationOptions: {
        header: null
      }
    },
    teamPlayers: {
      screen: TeamPlayers,
      navigationOptions: {
        title: TEAM_DETAILS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    }
  },
  {
    initialRouteName: VIEW_TEAMS
  }
);

export default createAppContainer(TeamsNavigator);
