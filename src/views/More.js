import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Container, Content } from 'native-base';
import BannerHeader, { NAV_BAR_HEIGHT } from '../components/BannerHeader';
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
            marginTop: NAV_BAR_HEIGHT * 2
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column'
            }}
          >
            <MoreItem
              iconName='md-tennisball'
              iconType='Ionicons'
              title='Archives'
              onPress={() => {}}
            />
            <MoreItem
              iconName='md-tennisball'
              iconType='Ionicons'
              title='Fixtures'
              onPress={() => {}}
            />
            <MoreItem
              iconName='ios-stats'
              iconType='Ionicons'
              title='Results'
              onPress={() => {}}
            />
            <MoreItem
              iconName='table'
              iconType='AntDesign'
              title='Points Table'
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
              iconName='ticket-confirmation'
              iconType='MaterialCommunityIcons'
              title='Tickets'
              onPress={() => {}}
            />
            <MoreItem
              iconName='modern-mic'
              iconType='Entypo'
              title='Podcasts'
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
              iconName='social-delicious'
              iconType='Foundation'
              title='SocialHub'
              onPress={() => {}}
            />
            <MoreItem
              iconName='cash-multiple'
              iconType='MaterialCommunityIcons'
              title='Sponsors'
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
