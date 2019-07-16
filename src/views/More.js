import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Container, Content } from 'native-base';
import BannerHeader, {
  NAV_BAR_HEIGHT,
  CONTENT_MARGIN_TOP
} from '../components/BannerHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  VIEW_MORE,
  VIEW_TICKETS,
  VIEW_SPONSOR,
  VIEW_RESULTS,
  VIEW_FIXTURES,
  VIEW_STATS,
  VIEW_PODCASTS,
  VIEW_ARCHIVES,
  VIEW_POINTS_TABLE
} from '../constants/viewNames';
import { MORE } from '../constants/strings';
import commonStyles from '../commons/styles';
import MoreItem from '../components/MoreItem';
import { HOME_BG_COLOR } from '../config/colors';
import { connect } from 'react-redux';

class More extends React.Component {
  _redirectToTickets() {
    this.props.navigation.navigate(VIEW_TICKETS);
  }
  _redirectToSponsors() {
    this.props.navigation.navigate(VIEW_SPONSOR);
  }
  _redirectToResults() {
    this.props.navigation.navigate(VIEW_RESULTS);
  }
  _redirectToPodcasts() {
    this.props.navigation.navigate(VIEW_PODCASTS);
  }
  render() {
    const { showFixtures, showTickets } = this.props;

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
              title='Archives'
              onPress={() => this.props.navigation.navigate(VIEW_ARCHIVES)}
            />
            {showFixtures && (
              <MoreItem
                iconImage={require('../../assets/images/more/fixtures.png')}
                title='Fixtures'
                onPress={() => {
                  this.props.navigation.navigate(VIEW_FIXTURES);
                }}
              />
            )}
            <MoreItem
              iconImage={require('../../assets/images/more/results.png')}
              title='Results'
              onPress={() => {
                this._redirectToResults();
              }}
            />
            <MoreItem
              iconImage={require('../../assets/images/more/points_table.png')}
              title='Points Table'
              onPress={() => this.props.navigation.navigate(VIEW_POINTS_TABLE)}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingTop: 20
            }}
          >
            {showTickets && (
              <MoreItem
                iconImage={require('../../assets/images/more/ticket.png')}
                title='Tickets'
                onPress={() => {
                  this._redirectToTickets();
                }}
              />
            )}
            <MoreItem
              iconImage={require('../../assets/images/more/podcasts.png')}
              title='Podcasts'
              onPress={() => {
                this._redirectToPodcasts();
              }}
            />
            <MoreItem
              iconImage={require('../../assets/images/more/stats.png')}
              title='Stats'
              onPress={() => this.props.navigation.navigate(VIEW_STATS)}
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
              title='SocialHub'
              onPress={() => {}}
            />
            <MoreItem
              iconImage={require('../../assets/images/more/sponsors.png')}
              title='Sponsors'
              onPress={() => {
                this._redirectToSponsors();
              }}
            />
          </View>
        </Content>
        <Footer activeButton={VIEW_MORE} {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  showFixtures: state.showFixtures,
  showTickets: state.showTickets
});

export default connect(mapStateToProps)(More);

const styles = StyleSheet.create({});
