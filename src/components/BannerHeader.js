import React from 'react';
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  Platform,
  Text
} from 'react-native';
import { HOME_BG_COLOR, VIEW_BG_COLOR } from '../config/colors';
import { isEqual } from '../utils';
import { HELVETICA } from '../constants/fonts';

export const NAV_BAR_HEIGHT = 64;
export const STATUS_BAR_HEIGHT = 24;
export const CONTENT_MARGIN_TOP =
  Platform.OS === 'ios'
    ? NAV_BAR_HEIGHT * 2 + STATUS_BAR_HEIGHT
    : NAV_BAR_HEIGHT * 2;

export default props => {
  const statusBar = isEqual(Platform.OS, 'ios')
    ? { paddingTop: STATUS_BAR_HEIGHT }
    : {};
  return (
    <View style={[styles.navBar, statusBar]}>
      <View style={styles.banner}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require('../../assets/images/header.jpg')}
          style={styles.bannerImage}
          resizeMode="stretch"
        />
      </View>
      {props.title !== undefined && (
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{props.title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAV_BAR_HEIGHT * 2,
    backgroundColor: HOME_BG_COLOR,
    flexDirection: 'column'
  },
  banner: {
    height: NAV_BAR_HEIGHT
  },
  bannerImage: {
    height: NAV_BAR_HEIGHT,
    width: '100%'
  },
  titleView: {
    height: NAV_BAR_HEIGHT,
    backgroundColor: VIEW_BG_COLOR,
    justifyContent: 'center',
    paddingLeft: 30
  },
  titleText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600'
  }
});
