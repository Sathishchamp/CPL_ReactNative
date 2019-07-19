import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { HELVETICA } from '../constants/fonts';
import { TAB_BG } from '../config/colors';

const width = Dimensions.get('window').width;
const height = width * 0.3;

export default props => {
  const { count, data, onPress } = props;
  const {
    Player,
    playerImage,
    Team,
    Teamimage,
    Value,
    TeamId,
    PlayerId
  } = data;
  const playerName = Player.split(' ');
  return (
    <TouchableOpacity
      style={styles.mainView}
      onPress={() => onPress(Player, TeamId, PlayerId)}
    >
      <ImageBackground
        source={{
          uri: playerImage
        }}
        resizeMode="contain"
        imageStyle={{ height, width: height * 0.85 }}
        defaultSource={require('../../assets/images/filler_profileimage.png')}
        style={styles.playerImageBg}
      >
        <Text style={styles.countColor}>{count}</Text>
      </ImageBackground>
      <View style={styles.playerDetailsView}>
        <View style={styles.playerDetailsInnerView}>
          <View style={styles.playerDetailTextView}>
            <Text style={styles.playerDetailsFnameText}>{playerName[0]}</Text>
          </View>
          <View style={styles.playerDetailTextView}>
            <Text style={styles.playerDetailsLnameText}>{playerName[1]}</Text>
          </View>
          <View style={styles.playerDetailTextView}>
            <Image
              source={{
                uri: Teamimage
              }}
              style={styles.teamImage}
              resizeMode="contain"
            />
            <View style={styles.playerDetailTextView}>
              <Text style={styles.teamNameText}>{Team}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.valueView}>
        <Text style={styles.valueText}>{Value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height,
    width,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#707070'
  },
  playerImageBg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 10,
    paddingBottom: 0,
    paddingTop: 0
  },
  playerDetailsView: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  playerDetailsInnerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  playerDetailTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  teamImage: {
    height: 30,
    width: 30,
    marginLeft: 5
  },
  valueView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  valueText: {
    fontFamily: HELVETICA,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10
  },
  playerDetailsFnameText: {
    fontFamily: HELVETICA,
    color: '#707070',
    fontSize: 16,
    alignSelf: 'flex-end'
  },
  playerDetailsLnameText: {
    fontFamily: HELVETICA,
    color: '#000000',
    fontSize: 19,
    fontWeight: '600'
  },
  teamNameText: {
    fontFamily: HELVETICA,
    color: '#707070',
    fontSize: 16,
    alignSelf: 'flex-end'
  },
  countColor: {
    fontFamily: HELVETICA,
    fontWeight: '800',
    fontSize: 23,
    color: TAB_BG
  }
});
