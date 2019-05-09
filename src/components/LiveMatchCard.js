import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { isEqual } from '../utils';

const SCREEN_W = Dimensions.get('screen').width;
const LIVE_STR = 'Live';

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
    state
  } = props.data;
  console.log(props);
  return (
    <View style={styles.mainView}>
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
        {isEqual(state, LIVE_STR) && (
          <View style={styles.scoreView}>
            <View style={styles.flexRow1}>
              <Text style={styles.runsText}>{teamaRuns + '/' + teamawkts}</Text>
            </View>
            <View style={styles.flexRow1}>
              <Text>{'RR ' + teamaRR}</Text>
            </View>
            <View style={styles.flexRow1}>
              <Text>{teamaovers + '/' + teamatotalovers}</Text>
            </View>
          </View>
        )}
        <View style={styles.vsView}>
          <View style={styles.vsInnerView}>
            <Text style={styles.vsText}>VS</Text>
          </View>
        </View>
        {isEqual(state, LIVE_STR) && (
          <View style={styles.scoreView}>
            <View style={styles.flexRow1}>
              <Text style={styles.runsText}>{teambRuns + '/' + teambwkts}</Text>
            </View>
            <View style={styles.flexRow1}>
              <Text>{'RR ' + teambRR}</Text>
            </View>
            <View style={styles.flexRow1}>
              <Text>{teambovers + '/' + teambtotalovers}</Text>
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
          {status}
        </Text>
      </View>
    </View>
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
    flex: 1,
    flexDirection: 'row'
  },
  thirdRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
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
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  runsText: {
    fontWeight: '700'
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
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'justify'
  }
});
