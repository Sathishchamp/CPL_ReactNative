import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  WebView
} from 'react-native';
import { Container, Content } from 'native-base';
import commonStyles from '../commons/styles';
import { WHITE } from '../config/colors';
import AdBanner from '../ads/Banner';

const SCREEN_W = Dimensions.get('screen').width;
const SCREEN_H = Dimensions.get('screen').height;

class NewsView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      description: ''
    };
  }

  componentDidMount() {
    let description = this.props.navigation.getParam('description');
    const imageUrl = description
      .match('src="(.*?)"')[0]
      .slice(4)
      .replace(/"/g, '');
    description = description.split('<div class="field field-name-body');
    description = '<div class="field field-name-body' + description[1];
    this.setState({
      imageUrl,
      description
    });
  }

  render() {
    return (
      <Container>
        <Content style={commonStyles.content}>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: this.state.imageUrl }}
              style={{ width: SCREEN_W, height: SCREEN_W * 0.5 }}
              resizeMode="cover"
            />
          </View>
          <View style={{}}>
            <AdBanner size="mediumRectangle" />
          </View>
          <View style={{ flex: 1, height: SCREEN_H }}>
            {/* <Text style={{ color: WHITE, textAlign: 'justify' }}>
              {this.state.description}
            </Text> */}
            <WebView
              originWhitelist={['*']}
              source={{ html: this.state.description }}
              style={{ flex: 1, fontSize: 14 }}
              scalesPageToFit={false}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default NewsView;
