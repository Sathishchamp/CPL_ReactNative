import React from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    };
  }

  _bannerErrorHandler = err => {
    console.log('************');
    console.log(err);
    if (err) {
      this.setState({ display: false });
    }
  };

  render() {
    if (this.state.display) {
      return (
        <AdMobBanner
          adUnitID='/6428571/CPL-T20-APP-320x50'
          bannerSize={this.props.size}
          didFailToReceiveAdWithError={this._bannerErrorHandler}
        />
      );
    }
    return <View />;
  }
}

export default Banner;
