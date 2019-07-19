import React from 'react';
import { View, StyleSheet, Text, WebView } from 'react-native';
import { Container, Tab, Tabs, TabHeading } from 'native-base';
import commonStyles from '../commons/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { SQUARE721 } from '../constants/fonts';
import { VIEW_BG_COLOR, TAB_BG, SPINNER_COLOR } from '../config/colors';

const URL_TWITTER = 'https://twitter.com/CPL?ref_src=twsrc';
const URL_FACEBOOK = 'https://www.facebook.com/CarnivalT20/';
const URL_INSTAGRAM = 'https://www.instagram.com/cplt20/';

class Fixtures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  componentDidMount() {}

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} color={SPINNER_COLOR} />
    );
  }

  _withTab(title, content) {
    return (
      <Tab
        tabStyle={{ backgroundColor: VIEW_BG_COLOR }}
        activeTabStyle={{ backgroundColor: VIEW_BG_COLOR }}
        heading={title}
      >
        {content}
      </Tab>
    );
  }

  _renderWebView(uri) {
    return (
      <WebView originWhitelist={['*']} source={{ uri }} style={{ flex: 1 }} />
    );
  }

  render() {
    return (
      <Container>
        <Tabs>
          {this._withTab('TWITTER', this._renderWebView(URL_TWITTER))}
          {this._withTab('FACEBOOK', this._renderWebView(URL_FACEBOOK))}
          {this._withTab('INSTAGRAM', this._renderWebView(URL_INSTAGRAM))}
        </Tabs>
        {this._renderSpinner()}
      </Container>
    );
  }
}

export default Fixtures;
