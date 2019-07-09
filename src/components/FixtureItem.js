import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TAB_BG } from '../config/colors';
import { VAGROUND, HELVETICA } from '../constants/fonts';

const SCREEN_W = Dimensions.get('window').width;

export default props => {
  const {
    venue,
    teamaimage,
    teambimage,
    teama,
    teamb,
    starttimeGMT,
    knockOut
  } = props.data;
  return (
    <View style={styles.maiView}>
      <View style={styles.firstView}>
        <View style={styles.dateCol}>
          <Text style={styles.firstViewText}>{starttimeGMT}</Text>
        </View>
        <View style={styles.matchCol}>
          <Text style={styles.firstViewText}>{knockOut}</Text>
        </View>
      </View>
      <View style={styles.secondView}>
        <View style={styles.secondRowFirstCol}>
          <View style={styles.teamImageView}>
            <Image
              resizeMode="contain"
              source={{ uri: teamaimage }}
              style={styles.teamImage}
            />
          </View>
          <View style={styles.teamImageView}>
            <Image
              resizeMode="contain"
              source={{ uri: teambimage }}
              style={styles.teamImage}
            />
          </View>
        </View>
        <View style={styles.secondRowSecondCol}>
          <View style={styles.teamNameView}>
            <Text style={styles.teamNameText}>{teama}</Text>
          </View>
          <View style={styles.vsView}>
            <View style={styles.vsInnerView}>
              <Text style={styles.vsText}>VS</Text>
            </View>
          </View>
          <View style={styles.teamNameView}>
            <Text style={styles.teamNameText}>{teamb}</Text>
          </View>
          <View style={styles.locationTextView}>
            <Text style={styles.locationText}>{venue}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maiView: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    marginBottom: 15,
    height: SCREEN_W * 0.35
  },
  firstView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: TAB_BG,
    borderRadius: 5,
    padding: 4,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center'
  },
  dateCol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  firstViewText: {
    color: 'white'
  },
  matchCol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
  secondView: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10
  },
  secondRowFirstCol: {
    flex: 2,
    flexDirection: 'row',
    borderRightWidth: 2,
    borderRightColor: 'black'
  },
  teamNameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamNameText: {
    fontFamily: VAGROUND,
    fontSize: 14
  },
  secondRowSecondCol: {
    flex: 3,
    flexDirection: 'column'
  },
  teamImageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationTextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  locationText: {
    fontFamily: HELVETICA,
    fontSize: 16
  },
  teamImage: {
    height: 60,
    width: 60
  }
});
