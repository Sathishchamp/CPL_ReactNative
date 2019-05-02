import { StyleSheet, Dimensions, Platform } from 'react-native';
import { PRIMARY, ON_PRIMARY } from '../config/colors';

export default StyleSheet.create({
  headerDefault: {
    backgroundColor: PRIMARY,
    shadowColor: 'grey',
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
  }
});
