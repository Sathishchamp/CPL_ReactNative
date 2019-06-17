import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import { WHITE, TAB_BG, VIEW_BG_COLOR } from '../config/colors';
import { SQUARE721 } from '../constants/fonts';

export default props => (
  <TouchableOpacity style={styles.mainView} onPress={() => props.onPress()}>
    <View style={styles.iconView}>
      <Image
        source={props.iconImage}
        style={{ height: 30, width: 30 }}
        resizeMode="contain"
      />
    </View>
    <View style={styles.titleView}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: VIEW_BG_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 1,
    marginBottom: 1,
    height: 65
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: WHITE,
    fontSize: 20
  },
  titleView: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    color: WHITE,
    fontSize: 16,
    fontFamily: SQUARE721
  }
});
