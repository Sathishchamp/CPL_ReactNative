import React, { PureComponent } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Footer, FooterTab, Button, Icon, Label } from 'native-base';
import { WHITE, PRIMARY, ICON_ACTIVE, ICON_INACTIVE } from '../config/colors';
import {
  VIEW_HOME,
  VIEW_NEWS,
  VIEW_VIDEOS,
  VIEW_MORE,
  VIEW_NAV_HOME,
  VIEW_NAV_NEWS,
  VIEW_NAV_VIDEOS,
  VIEW_NAV_MORE,
  VIEW_TEAMS,
  VIEW_NAV_TEAMS
} from '../constants/viewNames';
import { isEqual } from '../utils/index';
import { HOME, MATCHES, NEWS, VIDEOS, MORE, TEAMS } from '../constants/strings';

const homeDark = require('../../assets/images/home/home_dark.png');
const homeGray = require('../../assets/images/home/home_gray.png');
const teamDark = require('../../assets/images/home/team_dark.png');
const teamGray = require('../../assets/images/home/team_gray.png');
const newsDark = require('../../assets/images/home/news_dark.png');
const newsGray = require('../../assets/images/home/news_gray.png');
const videosDark = require('../../assets/images/home/videos_dark.png');
const videosGray = require('../../assets/images/home/videos_gray.png');
const moreDark = require('../../assets/images/home/more_dark.png');
const moreGray = require('../../assets/images/home/more_gray.png');

export default class CustomFooter extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderHomeButton() {
    const iconStyle = isEqual(this.props.activeButton, VIEW_HOME)
      ? styles.iconActiveStyle
      : styles.iconInActiveStyle;
    const image = isEqual(this.props.activeButton, VIEW_HOME)
      ? homeDark
      : homeGray;
    return (
      <Button onPress={() => this.props.navigation.navigate(VIEW_NAV_HOME)}>
        <Image source={image} style={styles.iconImage} resizeMode="contain" />
        <Label style={[styles.labelStyle, iconStyle]}>{HOME}</Label>
      </Button>
    );
  }

  _renderTeamsButton() {
    const iconStyle = isEqual(this.props.activeButton, VIEW_TEAMS)
      ? styles.iconActiveStyle
      : styles.iconInActiveStyle;
    const image = isEqual(this.props.activeButton, VIEW_TEAMS)
      ? teamDark
      : teamGray;
    return (
      <Button onPress={() => this.props.navigation.navigate(VIEW_NAV_TEAMS)}>
        <Image source={image} style={styles.iconImage} resizeMode="contain" />
        <Label style={[styles.labelStyle, iconStyle]}>{TEAMS}</Label>
      </Button>
    );
  }

  _renderNewsButton() {
    const iconStyle = isEqual(this.props.activeButton, VIEW_NEWS)
      ? styles.iconActiveStyle
      : styles.iconInActiveStyle;
    const image = isEqual(this.props.activeButton, VIEW_NEWS)
      ? newsDark
      : newsGray;
    return (
      <Button onPress={() => this.props.navigation.navigate(VIEW_NAV_NEWS)}>
        <Image source={image} style={styles.iconImage} resizeMode="contain" />
        <Label style={[styles.labelStyle, iconStyle]}>{NEWS}</Label>
      </Button>
    );
  }

  _renderVideosButton() {
    const iconStyle = isEqual(this.props.activeButton, VIEW_VIDEOS)
      ? styles.iconActiveStyle
      : styles.iconInActiveStyle;
    const image = isEqual(this.props.activeButton, VIEW_VIDEOS)
      ? videosDark
      : videosGray;
    return (
      <Button onPress={() => this.props.navigation.navigate(VIEW_NAV_VIDEOS)}>
        <Image source={image} style={styles.iconImage} resizeMode="contain" />
        <Label style={[styles.labelStyle, iconStyle]}>{VIDEOS}</Label>
      </Button>
    );
  }

  _renderMoreButton() {
    const iconStyle = isEqual(this.props.activeButton, VIEW_MORE)
      ? styles.iconActiveStyle
      : styles.iconInActiveStyle;

    const image = isEqual(this.props.activeButton, VIEW_MORE)
      ? moreDark
      : moreGray;
    return (
      <Button onPress={() => this.props.navigation.navigate(VIEW_NAV_MORE)}>
        <Image source={image} style={styles.iconImage} resizeMode="contain" />
        <Label style={[styles.labelStyle, iconStyle]}>{MORE}</Label>
      </Button>
    );
  }

  render() {
    return (
      <Footer>
        <FooterTab style={styles.footerStyle}>
          {this._renderHomeButton()}
          {this._renderTeamsButton()}
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
  },
  iconImage: {
    height: 25,
    width: 25
  }
});
