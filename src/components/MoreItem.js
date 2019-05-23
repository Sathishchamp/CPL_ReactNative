import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { WHITE, TAB_BG } from '../config/colors';

export default props => (
  <TouchableOpacity style={styles.mainView}>
    <View style={styles.iconView}>
      <Icon name={props.iconName} type={props.iconType} style={styles.icon} />
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
    backgroundColor: TAB_BG,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 4,
    marginBottom: 4,
    height: 45
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
    fontSize: 20
  }
});
