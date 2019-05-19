import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Container, Content, Tab, Tabs } from 'native-base';
import commonStyles from '../commons/styles';
import { PRIMARY, TAB_BG } from '../config/colors';
import { isEqual } from '../utils';
import MatchInfoCard from '../components/MatchInfoCard';
import TeamTabs from '../components/TeamTabs';
import BattingScoreCard from '../components/BattingScoreCard';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Actions from '../actions';
import { connect } from 'react-redux';
import APIService from '../services/APIService';
import { translateArrayToJSON } from '../utils/CompDataParser';

class MatchCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      activeInfoTeam: 1,
      activeScoreCardTab: 1,
      matchDetails: {},
      teamABattingScores: [],
      teamBBattingScores: []
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    const { competitionId, navigation } = this.props;
    this.setState({ spinner: true }, () =>
      APIService.getScores(
        competitionId,
        navigation.getParam('matchId'),
        data => {
          const { scorecard } = data;
          console.log(scorecard);

          const matchDetails = translateArrayToJSON(scorecard.matches)[0];
          let teamABattingScores = [];
          let teamBBattingScores = [];

          //check with innings1
          if (
            isEqual(
              matchDetails.teama,
              scorecard.innings.innings1.batteam.batteamName
            )
          ) {
            teamABattingScores = translateArrayToJSON(
              scorecard.innings.innings1.batteam.player
            );
          }
          if (
            isEqual(
              matchDetails.teamb,
              scorecard.innings.innings1.batteam.batteamName
            )
          ) {
            teamBBattingScores = translateArrayToJSON(
              scorecard.innings.innings1.batteam.player
            );
          }

          //check with innings2
          if (
            isEqual(
              matchDetails.teama,
              scorecard.innings.innings2.batteam.batteamName
            )
          ) {
            teamABattingScores = translateArrayToJSON(
              scorecard.innings.innings2.batteam.player
            );
          }
          if (
            isEqual(
              matchDetails.teamb,
              scorecard.innings.innings2.batteam.batteamName
            )
          ) {
            teamBBattingScores = translateArrayToJSON(
              scorecard.innings.innings2.batteam.player
            );
          }

          console.log(scorecard.innings);

          this.setState({
            spinner: false,
            matchDetails,
            teamABattingScores,
            teamBBattingScores
          });
        }
      )
    );
  }

  _withContent(content) {
    return <Content style={commonStyles.content}>{content}</Content>;
  }

  _withTab(heading, content) {
    return (
      <Tab
        heading={heading}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        textStyle={styles.textStyle}
        activeTextStyle={styles.textStyle}
      >
        {content}
      </Tab>
    );
  }

  _renderInfo() {
    const { activeInfoTab, matchDetails } = this.state;

    const tempPlayersListA = [
      'RG Sharma',
      'SA Yadav',
      'Ishan Kishan',
      'KH Pandia',
      'MJ McClenaghan'
    ];
    const tempPlayersListB = [
      'Dhoni',
      'KA Pollard',
      'RD Chahar',
      'JJ Bhumrah',
      'SL Malinga'
    ];

    const playersList = isEqual(activeInfoTab, 1)
      ? tempPlayersListA
      : tempPlayersListB;

    return this._withContent(
      <View style={infoStyles.mainView}>
        <MatchInfoCard data={this.state.matchDetails} />
        <View style={infoStyles.playingXiView}>
          <Text style={infoStyles.playingXiText}>PLAYING XI</Text>
        </View>
        <TeamTabs
          teamA={matchDetails.teama}
          teamB={matchDetails.teamb}
          onTabPress={activeInfoTab => this.setState({ activeInfoTab })}
        />
        <View style={infoStyles.infoListView}>
          <FlatList
            data={playersList}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <View style={infoStyles.infoPlayerListItem}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white' }}>
                    {parseInt(index + 1) + '.'}
                  </Text>
                </View>
                <View style={{ flex: 12 }}>
                  <Text style={{ color: 'white' }}>{item}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  _renderScoreCard() {
    const {
      activeScoreCardTab,
      matchDetails,
      teamABattingScores,
      teamBBattingScores
    } = this.state;

    return this._withContent(
      <View style={{ flex: 1 }}>
        <TeamTabs
          teamA={matchDetails.teama}
          teamB={matchDetails.teamb}
          onTabPress={activeScoreCardTab =>
            this.setState({ activeScoreCardTab })
          }
        />
        <BattingScoreCard
          data={
            isEqual(activeScoreCardTab, 1)
              ? teamABattingScores
              : teamBBattingScores
          }
        />
      </View>
    );
  }

  _renderTimeline() {
    return this._withContent(
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>Timeline</Text>
      </View>
    );
  }

  _renderFullCommentary() {
    return this._withContent(
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>Full Commentary</Text>
      </View>
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
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        <Tabs
          style={{ flex: 1 }}
          tabBarUnderlineStyle={{ borderBottomColor: '#267fff' }}
        >
          {this._withTab('INFO', this._renderInfo())}
          {this._withTab('SCORECARD', this._renderScoreCard())}
          {this._withTab('TIMELINE', this._renderTimeline())}
          {this._withTab('FULL COMMENTARY', this._renderFullCommentary())}
        </Tabs>
        {this._renderSpinner()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  competitionId: state.competitionId
});

export default connect(mapStateToProps)(MatchCenter);

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: TAB_BG
  },
  activeTabStyle: {
    backgroundColor: TAB_BG
  },
  textStyle: {
    color: 'white',
    fontSize: 12
  }
});

const infoStyles = StyleSheet.create({
  mainView: { flex: 1 },
  playingXiView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  playingXiText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  },

  infoPlayerListItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 5
  },
  infoListView: {
    marginLeft: 10,
    marginRight: 10
  }
});
