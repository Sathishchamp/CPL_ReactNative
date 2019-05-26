import React, { PureComponent } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Header, Left, Right, Body, Title } from 'native-base';
import { PRIMARY, WHITE, TAB_BG } from '../config/colors';

export default props => (
  <Header style={styles.header}>
    <StatusBar backgroundColor={PRIMARY} barStyle='light-content' />
    <Left />
    <Body style={styles.body}>
      <Title style={styles.title}>{props.title}</Title>
    </Body>
    <Right />
  </Header>
);

const styles = StyleSheet.create({
  body: {
    flex: 3
  },
  header: {
    backgroundColor: TAB_BG
  },
  title: {
    color: WHITE
  }
});
