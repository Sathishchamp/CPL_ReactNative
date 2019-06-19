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
import {
  PRIMARY,
  TAB_BG,
  WHITE,
  BACKGROUND,
  VIEW_BG_COLOR
} from '../config/colors';
import { isEqual, isNullOrEmpty } from '../utils';
import MatchInfoCard from '../components/MatchInfoCard';
import TeamTabs from '../components/TeamTabs';
import BattingScoreCard from '../components/BattingScoreCard';
import BowlingScoreCard from '../components/BowlingScoreCard';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Actions from '../actions';
import { connect } from 'react-redux';
import APIService from '../services/APIService';
import { translateArrayToJSON } from '../utils/CompDataParser';
import {
  STATUS_LIVE,
  STATUS_COMPLETED,
  STATUS_CANCELLED
} from '../constants/matchStatus';
import { VAGROUND, SQUARE721, HELVETICA } from '../constants/fonts';
import CommentaryItem from '../components/CommentaryItem';

class MatchCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      activeInfoTab: 1,
      activeScoreCardTab: 1,
      matchDetails: {},
      teamABattingScores: [],
      teamBBattingScores: [],
      matchStarted: false,
      teamAPlayers: [],
      teamBPlayers: [],
      teamAExtras: '',
      teamBExtras: '',
      teamAFallofWickets: '',
      teamBFallofWickets: '',
      teamABowlingData: [],
      teamBBowlingData: [],
      fullCommentary: []
    };
  }

  componentDidMount() {
    this.setState({ spinner: true }, () => this._fetchData());
  }

  async _fetchData() {
    const { competitionId, navigation } = this.props;
    const matchId = navigation.getParam('matchId');
    try {
      const prematch = await this._fetchPrematch(competitionId, matchId);
      const { matchDetails, teamAPlayers, teamBPlayers } = prematch;
      const { teama, teamb } = prematch.matchDetails;

      const scoresData = await this._fetchScores(
        competitionId,
        matchId,
        teama,
        teamb
      );

      const fullCommentary = await this._fetchFullCommentary(
        competitionId,
        matchId
      );

      const {
        matchStarted,
        teamABattingScores,
        teamBBattingScores,
        teamAExtras,
        teamBExtras,
        teamAFallofWickets,
        teamBFallofWickets,
        teamABowlingData,
        teamBBowlingData
      } = scoresData;

      this.setState({
        spinner: false,
        matchDetails,
        teamAPlayers,
        teamBPlayers,
        matchStarted,
        teamAExtras,
        teamBExtras,
        teamAFallofWickets,
        teamBFallofWickets,
        teamABattingScores,
        teamBBattingScores,
        teamABowlingData,
        teamBBowlingData,
        fullCommentary
      });
    } catch (err) {
      this.setState({ spinner: false, matchDetails });
    }
  }

  _fetchPrematch(competitionId, matchId) {
    return new Promise((resolve, reject) => {
      APIService.getScores(competitionId, matchId, 'prematch', data => {
        const teamList = translateArrayToJSON(data.prematch.TeamList);
        const matchDetails = translateArrayToJSON(
          data.prematch.matchdetails
        )[0];
        const teamAPlayers = teamList
          .filter(item => isEqual(item.teamname, matchDetails.teama))
          .map(item => item.player);
        const teamBPlayers = teamList
          .filter(item => isEqual(item.teamname, matchDetails.teamb))
          .map(item => item.player);
        resolve({ teamList, matchDetails, teamAPlayers, teamBPlayers });
      });
    });
  }

  _fetchScores(competitionId, matchId, teama, teamb) {
    return new Promise((resolve, reject) => {
      //if match is in Live, Completed or Cancelled state get the scores data
      const matchState = this.props.navigation.getParam('matchState');
      if (
        isEqual(matchState, STATUS_LIVE) ||
        isEqual(matchState, STATUS_COMPLETED) ||
        isEqual(matchState, STATUS_CANCELLED)
      ) {
        APIService.getScores(competitionId, matchId, 'scores', data => {
          const { scorecard } = data;

          console.log(scorecard);

          const commentaryNew = translateArrayToJSON(scorecard.commentarynew);

          const batsmanScores = translateArrayToJSON(
            scorecard.currentscores.batsman
          );
          const bowlerScores = translateArrayToJSON(
            scorecard.currentscores.bowler
          );

          console.log(batsmanScores);
          console.log(bowlerScores);

          let teamABattingScores = [];
          let teamBBattingScores = [];
          let teamAExtras = '';
          let teamBExtras = '';
          let teamAFallofWickets = '';
          let teamBFallofWickets = '';
          let teamABowlingData = [];
          let teamBBowlingData = [];

          //check with innings1
          if (isEqual(teama, scorecard.innings.innings1.batteam.batteamName)) {
            teamABattingScores = translateArrayToJSON(
              scorecard.innings.innings1.batteam.player
            );

            teamAExtras = translateArrayToJSON(
              scorecard.innings.innings1.extras
            );
            teamAExtras = teamAExtras[0].Extras + teamAExtras[0].Total;

            teamAFallofWickets = scorecard.innings.innings1.fallofwicketsstr;

            teamABowlingData = translateArrayToJSON(
              scorecard.innings.innings1.bowlteam.player
            );
          }
          if (isEqual(teamb, scorecard.innings.innings1.batteam.batteamName)) {
            teamBBattingScores = translateArrayToJSON(
              scorecard.innings.innings1.batteam.player
            );

            teamBExtras = translateArrayToJSON(
              scorecard.innings.innings1.extras
            );
            teamBExtras = teamBExtras[0].Extras + teamBExtras[0].Total;

            teamBFallofWickets = scorecard.innings.innings1.fallofwicketsstr;

            teamBBowlingData = translateArrayToJSON(
              scorecard.innings.innings1.bowlteam.player
            );
          }

          //check with innings2
          if (isEqual(teama, scorecard.innings.innings2.batteam.batteamName)) {
            teamABattingScores = translateArrayToJSON(
              scorecard.innings.innings2.batteam.player
            );

            teamAExtras = translateArrayToJSON(
              scorecard.innings.innings2.extras
            );
            teamAExtras = teamAExtras[0].Extras + teamAExtras[0].Total;

            teamAFallofWickets = scorecard.innings.innings2.fallofwicketsstr;

            teamABowlingData = translateArrayToJSON(
              scorecard.innings.innings2.bowlteam.player
            );
          }
          if (isEqual(teamb, scorecard.innings.innings2.batteam.batteamName)) {
            teamBBattingScores = translateArrayToJSON(
              scorecard.innings.innings2.batteam.player
            );

            teamBExtras = translateArrayToJSON(
              scorecard.innings.innings2.extras
            );
            teamBExtras = teamBExtras[0].Extras + teamBExtras[0].Total;

            teamBFallofWickets = scorecard.innings.innings2.fallofwicketsstr;

            teamBBowlingData = translateArrayToJSON(
              scorecard.innings.innings2.bowlteam.player
            );
          }

          resolve({
            teamABattingScores,
            teamBBattingScores,
            teamAFallofWickets,
            teamBFallofWickets,
            teamAExtras,
            teamBExtras,
            teamABowlingData,
            teamBBowlingData,
            matchStarted: true
          });
        });
      } else {
        resolve({
          teamABattingScores: [],
          teamBBattingScores: [],
          teamAExtras: '',
          teamBExtras: '',
          teamAFallofWickets: '',
          teamBFallofWickets: '',
          teamABowlingData: [],
          teamBBowlingData: [],
          matchStarted: false
        });
      }
    });
  }

  _fetchFullCommentary(competitionId, matchId) {
    return new Promise((resolve, reject) => {
      APIService.getScores(competitionId, matchId, 'fullcommentary', data => {
        resolve(translateArrayToJSON(data));
      });
    });
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
    const {
      activeInfoTab,
      teamAPlayers,
      teamBPlayers,
      matchDetails
    } = this.state;
    const playersList = isEqual(activeInfoTab, 1) ? teamAPlayers : teamBPlayers;

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
                  <Text style={{ color: 'white', fontFamily: VAGROUND }}>
                    {parseInt(index + 1) + '.'}
                  </Text>
                </View>
                <View style={{ flex: 12 }}>
                  <Text style={{ color: 'white', fontFamily: VAGROUND }}>
                    {item}
                  </Text>
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
      teamABattingScores,
      teamBBattingScores,
      teamAExtras,
      teamBExtras,
      teamAFallofWickets,
      teamBFallofWickets,
      teamABowlingData,
      teamBBowlingData,
      matchDetails
    } = this.state;

    const isActiveScoreCard1 = isEqual(activeScoreCardTab, 1);

    if (this.state.matchStarted) {
      return this._withContent(
        <View style={{ flex: 1, marginBottom: 30 }}>
          <TeamTabs
            teamA={matchDetails.teama}
            teamB={matchDetails.teamb}
            onTabPress={activeScoreCardTab =>
              this.setState({ activeScoreCardTab })
            }
          />
          <BattingScoreCard
            data={isActiveScoreCard1 ? teamABattingScores : teamBBattingScores}
          />
          <View style={scoreStyles.extrasView}>
            <Text style={scoreStyles.extrasText}>
              Extras: {isActiveScoreCard1 ? teamAExtras : teamBExtras}
            </Text>
          </View>
          <View style={scoreStyles.fallOfWicketsView}>
            <Text style={scoreStyles.fallOfWicketsText}>Fall of Wickets:</Text>
            <Text style={scoreStyles.fallOfWicketsText}>
              {isActiveScoreCard1 ? teamAFallofWickets : teamBFallofWickets}
            </Text>
          </View>
          <BowlingScoreCard
            data={isActiveScoreCard1 ? teamABowlingData : teamBBowlingData}
          />
        </View>
      );
    }
    return this._renderMatchNotYetStarted();
  }

  _renderTimeline() {
    if (this.state.matchStarted) {
      return this._withContent(
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white' }}>Timeline</Text>
        </View>
      );
    }
    return this._renderMatchNotYetStarted();
  }

  _renderFullCommentary() {
    const { matchStarted, fullCommentary } = this.state;
    if (matchStarted) {
      return this._withContent(
        <View style={{ flex: 1 }}>
          <FlatList
            data={fullCommentary}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <CommentaryItem data={item} />}
          />
        </View>
      );
    }
    return this._renderMatchNotYetStarted();
  }

  _renderMatchNotYetStarted() {
    return (
      <View style={styles.matchNotYetStartedView}>
        <Text style={styles.matchNotYetStartedText}>
          Match is not yet started
        </Text>
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
        <StatusBar backgroundColor={PRIMARY} barStyle='light-content' />
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
  },
  matchNotYetStartedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: VIEW_BG_COLOR
  },
  matchNotYetStartedText: {
    alignSelf: 'center',
    color: WHITE,
    fontSize: 18,
    fontWeight: '500'
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
    fontFamily: SQUARE721
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

const scoreStyles = StyleSheet.create({
  extrasText: {
    color: WHITE,
    fontFamily: SQUARE721,
    fontSize: 12
  },
  extrasView: {
    flex: 1,
    margin: 10
  },
  fallOfWicketsText: {
    color: 'white',
    fontFamily: HELVETICA,
    fontSize: 11
  },
  fallOfWicketsView: {
    flex: 2,
    margin: 10,
    marginTop: 30,
    flexDirection: 'column'
  }
});
