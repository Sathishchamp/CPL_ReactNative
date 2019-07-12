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
          const average = {
            title: AVERAGE,
            player: LtAllStats.LtHighest_CategoryAve[0]
          };
          const catches = {
            title: CATCHES,
            player: LtAllStats.LtHighest_CategoryCatches[0]
          };
          const econ = {
            title: ECON,
            player: LtAllStats.LtHighest_CategoryEcon[0]
          };
          const individual = {
            title: INDIVIDUAL,
            player: LtAllStats.LtHighest_CategoryInd[0]
          };
          const runOut = {
            title: RUNOUT,
            player: LtAllStats.LtHighest_CategoryRunOut[0]
          };
          const runs = {
            title: RUNS,
            player: LtAllStats.LtHighest_CategoryRuns[0]
          };
          const sr = {
            title: SR,
            player: LtAllStats.LtHighest_CategorySR[0]
          };
          const sixes = {
            title: SIXES,
            player: LtAllStats.LtHighest_CategorySix[0]
          };
          const stumping = {
            title: STUMPING,
            player: LtAllStats.LtHighest_CategoryStumping[0]
          };
          const figures = {
            title: FIGURES,
            player: LtAllStats.LtHighest_Categoryfig[0]
          };
          const wickets = {
            title: WICKETS,
            player: LtAllStats.LtHighest_Categorywkts[0]
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
          console.log(playerData)
          this.setState({ spinner: false, playerData });
        }
      }
    );
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: 'white' }} />
    );
  }

  render() {
    return (
      <Container>
        <Content style={[commonStyles.content, { backgroundColor: '#d9d9d9' }]}>
          <View>
            <FlatList
              data={this.state.playerData}
              renderItem={({ item }) => (
                <StatsMainPlayerItem data={item} color="#ff6600" />
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

export default connect(mapStateToProps)(Stats);
