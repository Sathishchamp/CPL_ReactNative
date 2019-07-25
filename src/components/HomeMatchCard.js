import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { isEqual, isNullOrEmpty } from '../utils';
import { STATUS_YET_TO_BEGIN } from '../constants/matchStatus';
import { VAGROUND, HELVETICA } from '../constants/fonts';

export const SCREEN_W = Dimensions.get('screen').width;
export const SCREEN_H = Dimensions.get('screen').height;
const MATCH_CARD_HEIGHT = SCREEN_W * 0.5;
export const MATCH_CARD_WIDTH = SCREEN_W * 0.95;

export default props => {
  const { data, showRR, fullCard, disableNavigation, compactCard } = props;
  const {
    starttimeGMT,
    status,
    teamaRR,
    teamawkts,
    teamaRuns,
    teamaovers,
    teamatotalovers,
    teamaimage,
    teambRR,
    teambwkts,
    teambRuns,
    teambovers,
    teambtotalovers,
    teambimage,
    knockOut,
    state,
    venue,
    matchId,
    result
  } = data;
  const secondInningStatus = props.data['2innstatus'];

  let statusText = status;
  if (isEqual(state, STATUS_YET_TO_BEGIN)) {
    statusText = venue;
  }

  let showTeamAScores = false;
  let showTeamBScores = false;
  if (!isNullOrEmpty(teamaovers)) {
    showTeamAScores = true;
  }
  if (!isNullOrEmpty(teambovers)) {
    showTeamBScores = true;
    statusText = secondInningStatus;
  }

  if (isEqual(state, 'Completed')) {
    statusText = result;
  }

  const cardStyle = [styles.mainView];
  if (fullCard) {
    cardStyle.push(styles.fullCard);
  }

  if (compactCard) {
    cardStyle.push({ height: MATCH_CARD_HEIGHT * 0.75 });
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => props.onCardPress(matchId)}
      style={{ flex: 1 }}
    >
      <View style={cardStyle}>
        <View style={styles.firstRow}>
          <View style={styles.matchTimeView}>
            <Text style={styles.matchTimeText}>{starttimeGMT}</Text>
          </View>
          <View style={styles.matchNameView}>
            <Text style={styles.matchNameText}>{knockOut}</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <View style={styles.teamImageView}>
            <Image
              source={{ uri: teamaimage }}
              style={styles.teamImage}
              resizeMode="contain"
            />
          </View>
          {showTeamAScores && (
            <View style={styles.scoreView}>
              <View style={styles.flexRow1}>
                <Text style={styles.runsText}>
                  {teamaRuns + '/' + teamawkts}
                </Text>
              </View>
              {showRR && (
                <View style={styles.flexRow1}>
                  <Text style={styles.rrText}>{'RR ' + teamaRR}</Text>
                </View>
              )}
              <View style={styles.flexRow3}>
                <Text style={styles.oversText}>
                  {teamaovers + '/' + teamatotalovers}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.vsView}>
            <View style={styles.vsInnerView}>
              <Text style={styles.vsText}>VS</Text>
            </View>
          </View>
          {showTeamBScores && (
            <View style={styles.scoreView}>
              <View style={styles.flexRow1}>
                <Text style={styles.runsText}>
                  {teambRuns + '/' + teambwkts}
                </Text>
              </View>
              {showRR && (
                <View style={styles.flexRow1}>
                  <Text style={styles.rrText}>{'RR ' + teambRR}</Text>
                </View>
              )}
              <View style={styles.flexRow3}>
                <Text style={styles.oversText}>
                  {teambovers + '/' + teambtotalovers}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.teamImageView}>
            <Image
              source={{ uri: teambimage }}
              style={styles.teamImage}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.thirdRow}>
          <Text style={styles.statusText} numberOfLines={2}>
            {statusText}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    height: MATCH_CARD_HEIGHT,
    width: MATCH_CARD_WIDTH,
    margin: 10,
    borderRadius: 10
  },
  fullCard: {
    height: SCREEN_W * 0.35,
    width: SCREEN_W,
    margin: 0,
    borderRadius: 0
  },
  firstRow: {
    flex: 1,
    flexDirection: 'row'
  },
  secondRow: {
    flex: 2,
    flexDirection: 'row'
  },
  thirdRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  matchTimeView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  matchTimeText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: HELVETICA,
    color: 'black'
  },
  matchNameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  matchNameText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: HELVETICA,
    color: 'black'
  },
  teamImageView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  runsText: {
    fontWeight: '700',
    fontSize: SCREEN_W * 0.0425,
    fontFamily: VAGROUND,
    color: 'black'
  },
  rrText: {
    fontSize: SCREEN_W * 0.0415,
    fontFamily: HELVETICA
  },
  oversText: {
    fontSize: SCREEN_W * 0.0415,
    fontFamily: HELVETICA
  },
  flexRow1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  flexRow3: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  vsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vsInnerView: {
    backgroundColor: '#424242',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 99,
    padding: 3
  },
  vsText: {
    fontSize: 11,
    color: 'white'
  },
  teamImage: {
    height: 60,
    width: 60
  },
  scoreView: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusText: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: VAGROUND,
    color: 'black'
  }
});
