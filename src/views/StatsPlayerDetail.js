import React from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import { Container, Content } from 'native-base';
import APIService from '../services/APIService';
import { connect } from 'react-redux';
import commonStyles from '../commons/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { translateArrayToJSON } from '../utils/CompDataParser';
import { isEqual, isNullOrEmpty } from '../utils';
import { SQUARE721, HELVETICA } from '../constants/fonts';
import { BG_GREY, SPINNER_COLOR } from '../config/colors';

const SCREEN_W = Dimensions.get('window').width;
const SCREEN_H = Dimensions.get('window').height;

class StatsPlayerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      noData: false,
      playerData: {}
    };
  }

  componentDidMount() {
    this.setState(
      {
        spinner: true
      },
      () => this._fetchData()
    );
  }

  _fetchData() {
    const teamId = this.props.navigation.getParam('teamId');
    let playerId = this.props.navigation.getParam('playerId');
    let url = this.props.playerProfileUrl + `/${teamId}_.json`;
    // ! temp url and playerId
    // url =
    //   'http://api.cricket-21.com/JsonResoruce/CPL/859/PlayerProfile/90_.json';
    // playerId = '1318';

    APIService.getPlayerList(url, (err, data) => {
      if (!err) {
        let playerProfiles = Object.keys(data.LtPlayerDetails).map(
          key => data.LtPlayerDetails[key]
        );
        const playerData = playerProfiles.filter(item => {
          const playerDetails = translateArrayToJSON(item.PlayerDetails)[0];
          if (isEqual(playerDetails['ID'], playerId)) {
            return item;
          }
        })[0];
        console.log(playerData);
        this.setState({ spinner: false, playerData });
      } else {
        this.setState({ spinner: false, noData: true });
      }
    });
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} color={SPINNER_COLOR} />
    );
  }

  _renderStatsRow(category, value) {
    return (
      <View style={styles.statsScoreRowView}>
        <View style={styles.statsScoreCategoryView}>
          <Text style={styles.statsScoreCategoryText}>{category}</Text>
        </View>
        <View style={styles.statsScoreCategoryValueView}>
          <Text style={styles.statsScoreCategoryText}>{value}</Text>
        </View>
      </View>
    );
  }

  _renderStatistics() {
    const { playerData } = this.state;
    if (isNullOrEmpty(playerData)) {
      return;
    }
    const { battingStatsDetails, bowlingStatsDetails } = playerData;
    const allBatStats = translateArrayToJSON(
      Object.assign([], battingStatsDetails)
    );
    const allBowlStats = translateArrayToJSON(
      Object.assign([], bowlingStatsDetails)
    );
    const batStats = allBatStats[allBatStats.length - 1];
    const bowlStats = allBowlStats[allBowlStats.length - 1];
    console.log(bowlStats);
    return (
      <View style={styles.statsMainView}>
        <View style={styles.statsTitleView}>
          <View style={styles.statsTitleInnerView}>
            <Text style={styles.titleText}>STATISTICS</Text>
          </View>
        </View>
        <View style={styles.statsScoreView}>
          <View style={styles.statsScoreInnerView}>
            <View style={styles.matchTitleView}>
              <Text style={styles.matchTitleText}>IPLT20</Text>
            </View>
            <View style={styles.statsScoreDetailView}>
              <View
                style={{ flex: 1, flexDirection: 'column', marginRight: 5 }}
              >
                <View style={styles.statsScoreDetailTitleView}>
                  <Text style={styles.statsScoreDetailTitleText}>Batting</Text>
                </View>
                <View style={{ flex: 3, paddingTop: 10 }}>
                  {this._renderStatsRow('Mat', batStats.Mat)}
                  {this._renderStatsRow('NO', batStats.NO)}
                  {this._renderStatsRow('Runs', batStats.Runs)}
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', marginLeft: 5 }}>
                <View style={styles.statsScoreDetailTitleView}>
                  <Text style={styles.statsScoreDetailTitleText}>Bowling</Text>
                </View>
                <View style={{ flex: 3, paddingTop: 10 }}>
                  {this._renderStatsRow(
                    'Balls',
                    parseFloat(bowlStats.Overs) * 6
                  )}
                  {this._renderStatsRow('Runs', bowlStats.Runs)}
                  {this._renderStatsRow('Wkts', bowlStats.Wkts)}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _renderPlayerView() {
    const { playerData } = this.state;
    if (isNullOrEmpty(playerData)) {
      return;
    }
    const player = translateArrayToJSON(
      Object.assign([], playerData.PlayerDetails)
    )[0];
    console.log(player);
    return (
      <View style={styles.playerView}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={styles.playerFnameView}>
            <Text style={styles.playerFnameText}>{player.FirstName}</Text>
          </View>
          <View style={styles.playerLnameView}>
            <Text style={styles.playerLnameText}>{player.LastName}</Text>
          </View>
        </View>
        <View style={styles.playerImageView}>
          <Image
            source={{
              uri: player.PlayerImage
            }}
            style={styles.playerImage}
            resizeMode="contain"
            defaultSource={require('../../assets/images/filler_profileimage.png')}
          />
        </View>
      </View>
    );
  }

  _renderNoData() {
    return (
      <View style={styles.noDataView}>
        <Text
          style={{
            fontFamily: HELVETICA,
            color: '#ffffff'
          }}
        >
          No statistics data found
        </Text>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Content style={commonStyles.content}>
          {this.state.noData && this._renderNoData()}
          {this._renderPlayerView()}
          {this._renderStatistics()}
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  playerProfileUrl: state.playerProfileUrl
});

export default connect(mapStateToProps)(StatsPlayerDetail);

const styles = StyleSheet.create({
  statsMainView: {
    height: SCREEN_H * 0.35,
    width: SCREEN_W,
    flexDirection: 'column',
    backgroundColor: BG_GREY
  },
  statsTitleView: {
    flex: 1,
    flexDirection: 'row'
  },
  statsTitleInnerView: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20
  },
  titleText: {
    fontFamily: SQUARE721,
    fontSize: 18,
    color: '#707070'
  },
  statsScoreView: {
    flex: 4,
    padding: 10,
    paddingTop: 20
  },
  statsScoreInnerView: {
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    borderRadius: 5
  },
  matchTitleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#707070'
  },
  matchTitleText: {
    color: '#000000',
    fontFamily: HELVETICA,
    fontSize: 18,
    fontWeight: '600'
  },
  statsScoreDetailView: {
    flex: 4,
    flexDirection: 'row'
  },
  statsScoreDetailTitleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5
  },
  statsScoreDetailTitleText: {
    fontFamily: HELVETICA,
    fontWeight: '800',
    fontSize: 20,
    color: '#000000'
  },
  statsScoreRowView: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: BG_GREY
  },
  statsScoreCategoryView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  statsScoreCategoryText: {
    fontFamily: HELVETICA
  },
  statsScoreCategoryValueView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  playerView: {
    height: SCREEN_H * 0.25,
    width: SCREEN_W,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20
  },
  playerFnameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  playerFnameText: { fontFamily: HELVETICA, fontSize: 20, color: '#ffffff' },
  playerLnameView: { flex: 1, flexDirection: 'row' },
  playerLnameText: {
    fontFamily: HELVETICA,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  playerImageView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  playerImage: {
    flex: 1,
    height: SCREEN_W * 0.3,
    width: 0.3
  },
  noDataView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SCREEN_H * 0.4
  }
});
