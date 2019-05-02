import React from 'react';
import { WebView } from 'react-native';

export default class NewsView extends React.PureComponent {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: this.props.navigation.getParam('description') }}
        style={{ flex: 1 }}
        scalesPageToFit={true}
      />
    );
  }
}
