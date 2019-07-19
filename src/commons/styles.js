import { StyleSheet, Dimensions, Platform } from 'react-native';
import { PRIMARY, ON_PRIMARY, VIEW_BG_COLOR, TAB_BG } from '../config/colors';

export default StyleSheet.create({
  headerDefault: {
    backgroundColor: VIEW_BG_COLOR,
    // shadowColor: 'grey',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 3
  },
  headerNavigatorTitle: {
    width: Dimensions.get('window').width,
    color: 'white'
  },
  headerTitleStyle: {
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
    color: ON_PRIMARY,
    fontSize: 18,
    fontWeight: '800'
  },
  content: {
    backgroundColor: VIEW_BG_COLOR
  }
});
