import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { VIEW_MORE } from '../constants/viewNames';
import { MORE } from '../constants/strings';
import commonStyles from '../commons/styles';
import MoreItem from '../components/MoreItem';

class More extends React.Component {
  render() {
    return (
      <Container>
        <Header title={MORE} />
        <Content style={commonStyles.content}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingTop: 20
            }}
          >
            <MoreItem
              iconName="table"
              iconType="AntDesign"
              title="Points Table"
            />
            <MoreItem
              iconName="modern-mic"
              iconType="Entypo"
              title="Podcasts"
            />
            <MoreItem
              iconName="social-delicious"
              iconType="Foundation"
              title="SocialHub"
            />
            <MoreItem iconName="ios-stats" iconType="Ionicons" title="Stats" />
            <MoreItem
              iconName="md-tennisball"
              iconType="Ionicons"
              title="Matches"
            />
            <MoreItem
              iconName="cash-multiple"
              iconType="MaterialCommunityIcons"
              title="Sponsors"
            />
            <MoreItem
              iconName="ticket-confirmation"
              iconType="MaterialCommunityIcons"
              title="Tickets"
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
