import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Container, Content } from 'native-base';
import BannerHeader, {
  NAV_BAR_HEIGHT,
  CONTENT_MARGIN_TOP
} from '../components/BannerHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { VIEW_MORE } from '../constants/viewNames';
import { MORE } from '../constants/strings';
import commonStyles from '../commons/styles';
import MoreItem from '../components/MoreItem';
import { HOME_BG_COLOR } from '../config/colors';

class More extends React.Component {
  render() {
    return (
      <Container>
        <BannerHeader title={MORE} />
        <Content
          style={{
            backgroundColor: HOME_BG_COLOR,
            marginTop: CONTENT_MARGIN_TOP
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column'
            }}
          >
            <MoreItem
              iconImage={require('../../assets/images/more/archives.png')}
              title="Archives"
              onPress={() => {}}
            />
            <MoreItem
              iconImage={require('../../assets/images/more/fixtures.png')}
              title="Fixtures"
              onPress={() => {}}
            />
            <MoreItem
              iconImage={require('../../assets/images/more/results.png')}
              title="Results"
              onPress={() => {}}
            />
            <MoreItem
              iconImage={require('../../assets/images/more/points_table.png')}
              title="Points Table"
              onPress={() => {}}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingTop: 20
            }}
          >
            <MoreItem
              iconImage={require('../../assets/images/more/ticket.png')}
              title="Tickets"
              onPress={() => {}}
            />
            <MoreItem
              iconImage={require('../../assets/images/more/podcasts.png')}
              title="Podcasts"
              onPress={() => {}}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingTop: 20
            }}
          >
            <MoreItem
              iconImage={require('../../assets/images/more/social_hub.png')}
              title="SocialHub"
              onPress={() => {}}
            />
            <MoreItem
              iconImage={require('../../assets/images/more/sponsors.png')}
              title="Sponsors"
              onPress={() => {}}
            />
          </View>
        </Content>
        <Footer activeButton={VIEW_MORE} {...this.props} />
      </Container>
    );
  }
}

export default More;

const styles = StyleSheet.create({});
