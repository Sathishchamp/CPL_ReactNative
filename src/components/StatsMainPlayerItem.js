import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { HELVETICA,SQUARE721 } from '../constants/fonts';

const SCREEN_W = Dimensions.get('window').width;

export default props => {
  const { title, player, color } = props.data;
  const { Category, Player, playerImage, Team, Teamimage, Value } = player;
  return (
    <TouchableOpacity style={styles.touchable}>
      <View style={styles.mainView}>
        <View
          style={[
            styles.titleView,
            {
              backgroundColor: color
            }
          ]}
        >
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.dataView}>
          <View style={styles.playerView}>
            <View style={styles.playerImageView}>
              <Image
                resizeMode="contain"
                style={styles.playerImage}
                source={{ uri: playerImage }}
              />
            </View>
            <View style={{ flex: 2, flexDirection: 'column' }}>
              <View style={styles.playerNameView}>
                <Text style={styles.playerNameText}>{Player}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.teamImageView}>
                  <Image
                    resizeMode="contain"
                    style={styles.teamImage}
                    source={{ uri: Teamimage }}
                  />
                </View>
                <View style={styles.teamNameView}>
                  <Text style={styles.teamNameText}>{Team}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.valueText}>{Value}</Text>
            <Text
              style={[
                styles.valueCategoryText,
                {
                  color: props.color
                }
              ]}
            >
              {Category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    height: SCREEN_W * 0.6
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    borderRadius: 5,
    shadowOffset: { height: 2, width: 2 },
    shadowColor: 'lightgrey',
    shadowOpacity: 0.8
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10
  },
  titleText: {
    fontFamily: SQUARE721,
    fontWeight: 'bold',
    color: '#fff'
  },
  dataView: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10
  },
  playerView: {
    flex: 1,
    flexDirection: 'column'
  },
  playerImageView: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  playerImage: {
    height: 60,
    width: 60,
    flex: 1
  },
  playerNameView: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  playerNameText: {
    fontFamily: HELVETICA,
    fontWeight: '500',
    fontSize: 20
  },
  teamImageView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  teamImage: {
    height: 30,
    width: 30
  },
  teamNameView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  teamNameText: {
    fontFamily: HELVETICA
  },
  valueView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  valueText: {
    fontFamily: HELVETICA,
    fontWeight: 'bold',
    fontSize: 25
  },
  valueCategoryText: {
    fontFamily: HELVETICA,
    fontWeight: '500'
  }
});
