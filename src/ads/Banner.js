import React from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';

class Banner extends React.Component {
  constructor(props) {
    super(props);
  }

  _bannerErrorHandler = err => {
    console.log('************')
    console.log(err);
  };

  render() {
    return (
      <View>
        <AdMobBanner
          adUnitID="ca-app-pub-7186654998335495/3170668339"
          bannerSize="fullBanner"
          didFailToReceiveAdWithError={this._bannerErrorHandler}
        />
      </View>
    );
  }
}

export default Banner;
