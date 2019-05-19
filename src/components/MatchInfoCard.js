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
    status,
    teama,
    teamb,
    teamaimage,
    teambovers,
    teambimage,
    state,
    venue,
    result
  } = props.data;
  const secondInningStatus = props.data['2innstatus'];

  let statusText = status;
  if (isEqual(state, YET_TO_BEGIN)) {
    statusText = venue;
  }

  if (!isNullOrEmpty(teambovers)) {
    statusText = secondInningStatus;
  }

  if (isEqual(state, 'Completed')) {
    statusText = result;
  }
  return (
    <View style={styles.mainView}>
      <View style={styles.firstRow}>
        <View style={styles.teamImageView}>
          <Image
            source={{ uri: teamaimage }}
            style={styles.teamImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.vsView}>
          <View style={[styles.flexRow1, { alignItems: 'center' }]}>
            <Text style={styles.teamName}>{teama}</Text>
          </View>
          <View>
            <View style={styles.vsInnerView}>
              <Text style={styles.vsText}>VS</Text>
            </View>
          </View>
          <View style={[styles.flexRow1, { alignItems: 'center' }]}>
            <Text style={styles.teamName}>{teamb}</Text>
          </View>
        </View>

        <View style={styles.teamImageView}>
          <Image
            source={{ uri: teambimage }}
            style={styles.teamImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.secondRow}>
        <Text style={styles.statusText} numberOfLines={2}>
          {statusText}
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
    // margin: 10,
    padding: 10,
    height: SCREEN_W * 0.35,
    margin: 10
  },
  firstRow: {
    flex: 3,
    flexDirection: 'row'
  },
  secondRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamImageView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRow1: {
    flex: 1,
    flexDirection: 'row'
  },
  vsView: {
    flex: 3,
    flexDirection: 'column',
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
  statusText: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center'
  },
  teamName: {
    fontWeight: '600'
  }
});
