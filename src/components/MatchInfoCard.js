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

export default props => {
  return (
    <View style={styles.mainView}>
      <View style={styles.firstRow}>
        <View style={styles.teamImageView}>
          <Image
            source={{ uri: '' }}
            style={styles.teamImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.vsView}>
          <View style={[styles.flexRow1, { alignItems: 'center' }]}>
            <Text style={styles.teamName}>Mumbai Indians</Text>
          </View>
          <View>
            <View style={styles.vsInnerView}>
              <Text style={styles.vsText}>VS</Text>
            </View>
          </View>
          <View style={[styles.flexRow1, { alignItems: 'center' }]}>
            <Text style={styles.teamName}>Chennai Super Kings</Text>
          </View>
        </View>

        <View style={styles.teamImageView}>
          <Image
            source={{ uri: '' }}
            style={styles.teamImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.secondRow}>
        <Text style={styles.statusText} numberOfLines={2}>
          Mumbai Indians won by 1 Runs
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
    justifyContent: 'center'
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
    height: 45,
    width: 45
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
