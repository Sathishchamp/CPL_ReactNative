import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import News from '../views/News';
import { VIEW_NEWS } from '../constants/viewNames';
import NewsView from '../views/NewsView';
import { NEWS } from '../constants/strings';
import { PRIMARY } from '../config/colors';
import commonStyles from '../commons/styles';
import BackButton from '../components/BackButton'

const NewsNavigator = createStackNavigator(
  {
    news: {
      screen: News,
      navigationOptions: {
        header: null
      }
    },
    newsNewsView: {
      screen: NewsView,
      navigationOptions: {
        title: NEWS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        headerLeft: <BackButton />
      }
    }
  },
  {
    initialRouteName: VIEW_NEWS
  }
);

export default createAppContainer(NewsNavigator);
