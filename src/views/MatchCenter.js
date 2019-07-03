import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView
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
import LiveMatchCard, { SCREEN_W } from '../components/LiveMatchCard';

class MatchCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      activeInfoTab: 1,
      activeScoreCardTab: 1,
      activeCommentaryTab: 1,
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
      fullCommentary: [],
      teamAInningsId: '',
      teamBInningsId: '',
      batsmanScores: [],
      bowlerScores: [],
      lastWicket: [],
      timelineCommentary: []
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
      console.log(fullCommentary);

      const {
        matchStarted,
        teamABattingScores,
        teamBBattingScores,
        teamAExtras,
        teamBExtras,
        teamAFallofWickets,
        teamBFallofWickets,
        teamABowlingData,
        teamBBowlingData,
        teamAInningsId,
        teamBInningsId,
        batsmanScores,
        bowlerScores,
        lastWicket,
        timelineCommentary
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
        fullCommentary,
        teamAInningsId,
        teamBInningsId,
        batsmanScores,
        bowlerScores,
        lastWicket,
        timelineCommentary
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

          const batsmanScores = translateArrayToJSON(
            scorecard.currentscores.batsman
          );
          const bowlerScores = translateArrayToJSON(
            scorecard.currentscores.bowler
          );
          const lastWicket = translateArrayToJSON(
            scorecard.currentscores.lastwicket
          );

          const timelineCommentary = translateArrayToJSON(scorecard.commentary);

          let teamABattingScores = [];
          let teamBBattingScores = [];
          let teamAExtras = '';
          let teamBExtras = '';
          let teamAFallofWickets = '';
          let teamBFallofWickets = '';
          let teamABowlingData = [];
          let teamBBowlingData = [];
          let teamAInningsId = '';
          let teamBInningsId = '';

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

            teamAInningsId = '1';
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

            teamBInningsId = '1';
          }

          //if innings2 is present
          if (!isEqual(scorecard.innings.innings2, undefined)) {
            //check with innings2
            if (
              isEqual(teama, scorecard.innings.innings2.batteam.batteamName)
            ) {
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

              teamAInningsId = '2';
            }
            if (
              isEqual(teamb, scorecard.innings.innings2.batteam.batteamName)
            ) {
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

              teamBInningsId = '2';
            }
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
            teamAInningsId,
            teamBInningsId,
            batsmanScores,
            bowlerScores,
            lastWicket,
            timelineCommentary,
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
          teamAInningsId: '',
          teamBInningsId: '',
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

  _withContent(content, scrollEnabled) {
    return (
      <Content scrollEnabled={scrollEnabled} style={commonStyles.content}>
        {content}
      </Content>
    );
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
      </View>,
      true
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
        </View>,
        true
      );
    }
    return this._renderMatchNotYetStarted();
  }

  _renderBatsmenScoreRow(col1, col2) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={timelineStyles.batsmanScoreCol}>
          <Text
            style={{ fontFamily: VAGROUND, fontWeight: 'bold', fontSize: 14 }}
          >
            {col1}
          </Text>
        </View>
        <View style={timelineStyles.batsmanScoreCol}>
          <Text style={{ fontFamily: HELVETICA, fontSize: 14 }}>{col2}</Text>
        </View>
      </View>
    );
  }

  _renderTimelineTitle(title) {
    return (
      <View style={timelineStyles.playerTitleView}>
        <View style={timelineStyles.playerTitleInnerView}>
          <Text style={timelineStyles.batsmenFont}>{title}</Text>
        </View>
      </View>
    );
  }

  _renderTimelinePlayerHeaderRow(player1, player2) {
    return (
      <View style={timelineStyles.playerNameBar}>
        <View style={timelineStyles.playerNameCol}>
          <Text style={[timelineStyles.playerNameFont, { color: 'white' }]}>
            {player1}
          </Text>
        </View>
        <View style={timelineStyles.playerNameCol}>
          <Text style={[timelineStyles.playerNameFont, { color: '#acb030' }]}>
            {player2}
          </Text>
        </View>
      </View>
    );
  }

  _renderTimelineBatsman(batsman, isFirstBatsman) {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {!isFirstBatsman && (
          <View style={timelineStyles.playerImageView}>
            <Image
              source={{ uri: batsman.PlayerImage }}
              style={timelineStyles.playerImage}
            />
          </View>
        )}
        <View style={{ flex: 1 }}>
          {this._renderBatsmenScoreRow('Runs', batsman.score)}
          {this._renderBatsmenScoreRow('Balls', batsman.Balls)}
          {this._renderBatsmenScoreRow('4s', batsman.fours)}
          {this._renderBatsmenScoreRow('6s', batsman.Six)}
          {this._renderBatsmenScoreRow('SR', batsman.SR)}
        </View>
        {isFirstBatsman && (
          <View style={timelineStyles.playerImageView}>
            <Image
              source={{ uri: batsman.PlayerImage }}
              style={timelineStyles.playerImage}
            />
          </View>
        )}
      </View>
    );
  }

  _renderTImelineBowlerScores(bowler1, bowler2) {
    return (
      <View style={timelineStyles.bowlerScoresView}>
        <View
          style={[
            timelineStyles.bowlerScoreRow,
            { borderRightWidth: 1, borderRightColor: VIEW_BG_COLOR }
          ]}
        >
          <View style={timelineStyles.bowlerScoreRowItem}>
            <Text style={timelineStyles.bowlerScoresFont}>{`${bowler1.score}-${
              bowler1.Balls
            }-${bowler1.fours}-${bowler1.Six}`}</Text>
          </View>
          <View style={timelineStyles.bowlerScoreRowItem}>
            <Text style={timelineStyles.bowlerScoresFont}>{`Econ ${
              bowler1.PlayerImage
            }`}</Text>
          </View>
        </View>
        <View style={timelineStyles.bowlerScoreRow}>
          <View style={timelineStyles.bowlerScoreRowItem}>
            <Text style={timelineStyles.bowlerScoresFont}>{`${bowler2.score}-${
              bowler2.Balls
            }-${bowler2.fours}-${bowler2.Six}`}</Text>
          </View>
          <View style={timelineStyles.bowlerScoreRowItem}>
            <Text style={timelineStyles.bowlerScoresFont}>{`Econ ${
              bowler2.PlayerImage
            }`}</Text>
          </View>
        </View>
      </View>
    );
  }

  _renderTimelineCommentary() {
    const { timelineCommentary } = this.state;
    return (
      <FlatList
        data={timelineCommentary}
        extraData={this.state}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <CommentaryItem data={item} />}
      />
    );
  }

  _renderTimeline() {
    const {
      matchDetails,
      matchStarted,
      batsmanScores,
      bowlerScores,
      lastWicket
    } = this.state;
    const batsman1 = batsmanScores[0];
    const batsman2 = batsmanScores[1];
    const bowler1 = bowlerScores[0];
    const bowler2 = bowlerScores[1];
    if (matchStarted) {
      const lastBatsmanContent =
        lastWicket[0].batsman + ' ' + lastWicket[0].RunsBalls;
      return this._withContent(
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <LiveMatchCard data={matchDetails} showRR={true} fullCard={true} />
          <View style={timelineStyles.playerTitleView}>
            <View style={timelineStyles.playerTitleINNERView}>
              <Text style={timelineStyles.batsmenFont}>BATSMEN</Text>
            </View>
            <View style={timelineStyles.lastbatsmanView}>
              <Text style={timelineStyles.lastbatsmanFont}>
                {`LAST BATSMAN : ${lastBatsmanContent}`}
              </Text>
            </View>
          </View>
          {this._renderTimelinePlayerHeaderRow(
            batsman1.Striker,
            batsman2.Striker
          )}
          <View style={timelineStyles.batsmanScoresPart}>
            {this._renderTimelineBatsman(batsman1, true)}
            {this._renderTimelineBatsman(batsman2, false)}
          </View>

          {this._renderTimelineTitle('BOWLERS')}
          {this._renderTimelinePlayerHeaderRow(
            bowler1.Striker,
            bowler2.Striker
          )}
          {this._renderTImelineBowlerScores(bowler1, bowler2)}
          {this._renderTimelineTitle('COMMENTARY')}
          {this._renderTimelineCommentary()}
        </View>,
        false
      );
    }
    return this._renderMatchNotYetStarted();
  }

  _renderFullCommentary() {
    const {
      matchStarted,
      fullCommentary,
      matchDetails,
      activeCommentaryTab,
      teamAInningsId,
      teamBInningsId
    } = this.state;
    const commentary = fullCommentary.filter(comment => {
      if (isEqual(activeCommentaryTab.toString(), teamAInningsId)) {
        return isEqual(teamAInningsId, comment.InningsID);
      }
      if (isEqual(activeCommentaryTab.toString(), teamBInningsId)) {
        return isEqual(teamBInningsId, comment.InningsID);
      }
    });
    if (matchStarted) {
      return this._withContent(
        <View style={{ flex: 1 }}>
          <TeamTabs
            teamA={matchDetails.teama}
            teamB={matchDetails.teamb}
            onTabPress={activeCommentaryTab =>
              this.setState({ activeCommentaryTab })
            }
          />
          <FlatList
            data={commentary}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <CommentaryItem data={item} />}
          />
        </View>,
        true
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
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        <Tabs
          style={{ flex: 1 }}
          tabBarUnderlineStyle={{ borderBottomColor: '#267fff' }}
        >
          {this._withTab('INFO', this._renderInfo())}
          {this._withTab('SCORECARD', this._renderScoreCard())}
          {this._withTab('TIMELINE', this._renderTimeline())}
          {this._withTab('COMMENTARY', this._renderFullCommentary())}
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

const timelineStyles = StyleSheet.create({
  playerTitleView: {
    // height: 20,
    marginTop: 3,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  playerTitleInnerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  lastbatsmanView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 5
  },
  batsmenFont: {
    fontFamily: SQUARE721,
    color: 'white'
  },
  lastbatsmanFont: {
    fontFamily: HELVETICA,
    color: 'white',
    fontSize: 12
  },
  playerNameBar: {
    flex: 1,
    backgroundColor: TAB_BG,
    flexDirection: 'row'
  },
  playerNameCol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  playerNameFont: {
    fontFamily: HELVETICA,
    fontSize: 14,
    margin: 1
  },
  batsmanScoreCol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  batsmanScoresPart: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 3
  },
  playerImage: {
    height: 50,
    width: 50
  },
  playerImageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bowlerScoresFont: {
    fontFamily: HELVETICA,
    fontSize: 14,
    margin: 2
  },
  bowlerScoreRowItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bowlerScoresView: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  bowlerScoreRow: {
    flex: 1,
    flexDirection: 'row'
  }
});
