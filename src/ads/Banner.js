import React from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';

class Banner extends React.Component {
  constructor(props) {
    super(props);
  }

  _bannerErrorHandler = err => {
    console.log('************');
    console.log(err);
  };

  render() {
    return (
      <View>
        <AdMobBanner
          adUnitID="/6428571/CPL-T20-APP-320x50"
          bannerSize={this.props.size}
          didFailToReceiveAdWithError={this._bannerErrorHandler}
        />
      </View>
    );
  }
}

export default Banner;
