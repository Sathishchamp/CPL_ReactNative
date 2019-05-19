import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { isEqual, isNullOrEmpty } from '../utils';

const SCREEN_W = Dimensions.get('screen').width;
const YET_TO_BEGIN = 'Yet To begin';

export default props => {
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
  } = props.data;
  const secondInningStatus = props.data['2innstatus'];

  let statusText = status;
  if (isEqual(state, YET_TO_BEGIN)) {
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

  return (
    <TouchableOpacity
      style={styles.mainView}
      onPress={() => props.onCardPress(matchId)}
    >
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
              <Text style={styles.runsText}>{teamaRuns + '/' + teamawkts}</Text>
            </View>
            <View style={styles.flexRow1}>
              <Text style={styles.rrText}>{'RR ' + teamaRR}</Text>
            </View>
            <View style={styles.flexRow1}>
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
              <Text style={styles.runsText}>{teambRuns + '/' + teambwkts}</Text>
            </View>
            <View style={styles.flexRow1}>
              <Text style={styles.rrText}>{'RR ' + teambRR}</Text>
            </View>
            <View style={styles.flexRow1}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    height: SCREEN_W * 0.5,
    borderRadius: 10
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
    fontWeight: '600'
  },
  matchNameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  matchNameText: {
    fontSize: 12,
    fontWeight: '600'
  },
  teamImageView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  runsText: {
    fontWeight: '700',
    fontSize: SCREEN_W * 0.045
  },
  rrText: {
    fontSize: SCREEN_W * 0.042
  },
  oversText: {
    fontSize: SCREEN_W * 0.042
  },
  flexRow1: {
    flex: 1,
    flexDirection: 'row'
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
    fontWeight: '500',
    textAlign: 'center'
  }
});
