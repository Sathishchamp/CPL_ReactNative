import React from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  Platform,
  Text,
  FlatList,
  Alert
} from 'react-native';
import { Container, Content } from 'native-base';
import APIService from '../services/APIService';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import commonStyles from '../commons/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { translateArrayToJSON } from '../utils/CompDataParser';
import {
  AVERAGE,
  CATCHES,
  ECON,
  INDIVIDUAL,
  RUNOUT,
  RUNS,
  SIXES,
  STUMPING,
  FIGURES,
  WICKETS,
  SR
} from '../constants/strings';
import StatsMainPlayerItem from '../components/StatsMainPlayerItem';
import { VIEW_STATS_DETAILS } from '../constants/viewNames';
import { BG_GREY, SPINNER_COLOR } from '../config/colors';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      playerData: []
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
    const {
      isStatsUpcoming,
      currentCompetitionId,
      upcomingCompetitionId,
      serverUrl
    } = this.props;
    let compId = currentCompetitionId;
    // if (isStatsUpcoming) {
    //   compId = upcomingCompetitionId;
    // }
    APIService.getCompData(
      serverUrl + compId + '/others.json',
      (err, compData) => {
        const playerData = [];
        if (err) {
          playerData = [];
        } else {
          const { LtAllStats } = compData;
          // * set stats data to redux state
          this.props.setAllStats(LtAllStats);
          const average = {
            title: AVERAGE,
            color: '#ff6600',
            player: LtAllStats.LtHighest_CategoryAve[0],
            key: 'LtHighest_CategoryAve'
          };
          const catches = {
            title: 'MOST CATCHES',
            color: '#003366',
            player: LtAllStats.LtHighest_CategoryCatches[0],
            key: 'LtHighest_CategoryCatches'
          };
          const econ = {
            title: ECON,
            color: '#993366',
            player: LtAllStats.LtHighest_CategoryEcon[0],
            key: 'LtHighest_CategoryEcon'
          };
          const individual = {
            title: 'HIGHEST SCORE',
            color: '#ff6600',
            player: LtAllStats.LtHighest_CategoryInd[0],
            key: 'LtHighest_CategoryInd'
          };
          const runOut = {
            title: 'MOST RUNOUTS',
            color: '#e6e600',
            player: LtAllStats.LtHighest_CategoryRunOut[0],
            key: 'LtHighest_CategoryRunOut'
          };
          const runs = {
            title: 'MOST RUNS',
            color: '#800000',
            player: LtAllStats.LtHighest_CategoryRuns[0],
            key: 'LtHighest_CategoryRuns'
          };
          const sr = {
            title: SR,
            color: '#009933',
            player: LtAllStats.LtHighest_CategorySR[0],
            key: 'LtHighest_CategorySR'
          };
          const sixes = {
            title: 'MOST SIXES',
            color: '#e6e600',
            player: LtAllStats.LtHighest_CategorySix[0],
            key: 'LtHighest_CategorySix'
          };
          const stumping = {
            title: 'MOST STUMPINGS',
            color: '#333300',
            player: LtAllStats.LtHighest_CategoryStumping[0],
            key: 'LtHighest_CategoryStumping'
          };
          const figures = {
            title: 'BEST BOWLING FIGURES',
            color: '#003366',
            player: LtAllStats.LtHighest_Categoryfig[0],
            key: 'LtHighest_Categoryfig'
          };
          const wickets = {
            title: 'MOST WICKETS',
            color: '#009900',
            player: LtAllStats.LtHighest_Categorywkts[0],
            key: 'LtHighest_Categorywkts'
          };

          playerData.push(
            average,
            catches,
            econ,
            individual,
            runOut,
            runs,
            sr,
            sixes,
            stumping,
            figures,
            wickets
          );
          this.setState({ spinner: false, playerData });
        }
      }
    );
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} color={SPINNER_COLOR} />
    );
  }

  render() {
    return (
      <Container>
        <Content style={[commonStyles.content, { backgroundColor: BG_GREY }]}>
          <View>
            <FlatList
              data={this.state.playerData}
              renderItem={({ item }) => (
                <StatsMainPlayerItem
                  data={item}
                  onPress={() =>
                    this.props.navigation.navigate(VIEW_STATS_DETAILS, {
                      title: item.title,
                      key: item.key
                    })
                  }
                />
              )}
              keyExtractor={({ item, index }) => index}
            />
          </View>
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isStatsUpcoming: state.isStatsUpcoming,
  currentCompetitionId: state.currentCompetitionId,
  upcomingCompetitionId: state.upcomingCompetitionId,
  serverUrl: state.serverUrl
});

export default connect(
  mapStateToProps,
  Actions
)(Stats);
