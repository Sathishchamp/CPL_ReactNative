import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';

const SCREEN_W = Dimensions.get('screen').width;

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
    teambimage
  } = props.data;
  return (
    <View style={styles.mainView}>
      <View style={styles.firstRow}>
        <View style={styles.matchTimeView}>
          <Text styles={styles.matchTimeText}>{starttimeGMT}</Text>
        </View>
        <View style={styles.matchNameView}>
          <Text style={styles.matchNameText}>Test</Text>
        </View>
      </View>
      <View style={styles.secondRow}>
        <View style={styles.teamImageView}>
          <Image
            source={{ uri: teamaimage }}
            style={styles.teamImage}
            resizeMode='contain'
          />
        </View>
        <View style={styles.scoreView}>
          <View style={styles.flexRow1}>
            <Text>{teamaRuns + '/' + teamawkts}</Text>
          </View>
          <View style={styles.flexRow1}>
            <Text>{'RR ' + teamaRR}</Text>
          </View>
          <View style={styles.flexRow1}>
            <Text>{teamaovers + '/' + teamatotalovers}</Text>
          </View>
        </View>
        <View style={styles.vsView}>
          <Text style={styles.vsText}>Vs</Text>
        </View>
        <View style={styles.scoreView}>
          <View style={styles.flexRow1}>
            <Text>{teambRuns + '/' + teambwkts}</Text>
          </View>
          <View style={styles.flexRow1}>
            <Text>{'RR ' + teambRR}</Text>
          </View>
          <View style={styles.flexRow1}>
            <Text>{teambovers + '/' + teambtotalovers}</Text>
          </View>
        </View>
        <View style={styles.teamImageView}>
          <Image
            source={{ uri: teambimage }}
            style={styles.teamImage}
            resizeMode='contain'
          />
        </View>
      </View>
      <View style={styles.thirdRow}>
        <Text style={{fontSize: 16, fontWeight: '500'}} numberOfLines={2}>{status}</Text>
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
    height: SCREEN_W * 0.4,
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
  matchTimeText: {},
  matchNameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  matchNameText: {},
  teamImageView: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center'
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
  vsText: {},
  teamImage: {
    height: 60,
    width: 60
  },
  scoreView: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
