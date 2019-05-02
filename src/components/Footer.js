import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Icon, Label } from 'native-base';
import { WHITE, PRIMARY, ICON_ACTIVE, ICON_INACTIVE } from '../config/colors';
import {
  VIEW_HOME,
  VIEW_MATCHES,
  VIEW_NEWS,
  VIEW_VIDEOS,
  VIEW_MORE,
  VIEW_NAV_HOME,
  VIEW_NAV_MATCHES,
  VIEW_NAV_NEWS,
  VIEW_NAV_VIDEOS,
  VIEW_NAV_MORE
} from '../constants/viewNames';
import { isEqual } from '../utils/index';
import { HOME, MATCHES, NEWS, VIDEOS, MORE } from '../constants/strings';

export default class CustomFooter extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderHomeButton() {
    const iconStyle = isEqual(this.props.activeButton, VIEW_HOME)
      ? styles.iconActiveStyle
      : styles.iconInActiveStyle;
    return (
      <Button onPress={() => this.props.navigation.navigate(VIEW_NAV_HOME)}>
        <Icon
          name='home'
          type='MaterialCommunityIcons'
          style={[iconStyle, styles.iconSize]}
        />
        <Label style={[styles.labelStyle, iconStyle]}>{HOME}</Label>
      </Button>
    );
  }

  _renderMatchesButton() {
    const iconStyle = isEqual(this.props.activeButton, VIEW_MATCHES)
      ? styles.iconActiveStyle
      : styles.iconInActiveStyle;
    return (
      <Button onPress={() => this.props.navigation.navigate(VIEW_NAV_MATCHES)}>
        <Icon
          name='bar-graph'
          type='Entypo'
          style={[iconStyle, styles.iconSize]}
        />
        <Label style={[styles.labelStyle, iconStyle]}>{MATCHES}</Label>
      </Button>
    );
  }

  _renderNewsButton() {
    const iconStyle = isEqual(this.props.activeButton, VIEW_NEWS)
      ? styles.iconActiveStyle
      : styles.iconInActiveStyle;
    return (
      <Button onPress={() => this.props.navigation.navigate(VIEW_NAV_NEWS)}>
        <Icon name='news' type='Entypo' style={[iconStyle, styles.iconSize]} />
        <Label style={[styles.labelStyle, iconStyle]}>{NEWS}</Label>
      </Button>
    );
  }

  _renderVideosButton() {
    const iconStyle = isEqual(this.props.activeButton, VIEW_VIDEOS)
      ? styles.iconActiveStyle
      : styles.iconInActiveStyle;
    return (
      <Button onPress={() => this.props.navigation.navigate(VIEW_NAV_VIDEOS)}>
        <Icon name='video' type='Entypo' style={[iconStyle, styles.iconSize]} />
        <Label style={[styles.labelStyle, iconStyle]}>{VIDEOS}</Label>
      </Button>
    );
  }

  _renderMoreButton() {
    const iconStyle = isEqual(this.props.activeButton, VIEW_MORE)
      ? styles.iconActiveStyle
      : styles.iconInActiveStyle;
    return (
      <Button onPress={() => this.props.navigation.navigate(VIEW_NAV_MORE)}>
        <Icon
          name='dots-vertical'
          type='MaterialCommunityIcons'
          style={[iconStyle, styles.iconSize]}
        />
        <Label style={[styles.labelStyle, iconStyle]}>{MORE}</Label>
      </Button>
    );
  }

  render() {
    return (
      <Footer>
        <FooterTab style={styles.footerStyle}>
          {this._renderHomeButton()}
          {this._renderMatchesButton()}
          {this._renderNewsButton()}
          {this._renderVideosButton()}
          {this._renderMoreButton()}
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  footerStyle: {
    backgroundColor: WHITE,
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 4
  },
  iconActiveStyle: {
    color: ICON_ACTIVE
  },
  iconInActiveStyle: {
    color: ICON_INACTIVE
  },
  iconSize: {
    fontSize: 23
  },
  labelStyle: {
    fontSize: 11
  }
});
