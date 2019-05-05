import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import { SHADOW_COLOR } from '../config/colors';
import moment from 'moment';

const SCREEN_W = Dimensions.get('screen').width;

export default props => {
  const { thumbnail, onPress, videoId, title, publishedAt } = props;
  const pubDateString = moment(new Date(props.publishedAt)).format(
    'ddd, DD MMM YYYY HH:mm:ss'
  );
  return (
    <TouchableOpacity onPress={() => onPress(videoId)}>
      <View style={[styles.videoCover, styles.coverFullWidth]}>
        <ImageBackground
          source={{ uri: thumbnail }}
          resizeMode="cover"
          style={[styles.image, styles.imageFullWidth]}
        >
          <Icon
            name="youtube"
            type="MaterialCommunityIcons"
            style={styles.youtubeIcon}
          />
        </ImageBackground>
        <View style={{ flex: 2, flexDirection: 'column' }}>
          <Text style={styles.videoText} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text
            style={styles.pubDateText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {pubDateString}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoCover: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 4,
    shadowOffset: { height: 4, width: 4 },
    shadowOpacity: 0.8,
    shadowColor: SHADOW_COLOR
  },
  image: {
    flex: 5,
    borderRadius: 5,
    overflow: 'hidden'
  },
  videoText: {
    flex: 1,
    margin: 5,
    fontSize: 12
  },
  pubDateText: {
    flex: 1,
    margin: 5,
    fontSize: 12
  },
  coverFullWidth: {
    width: SCREEN_W * 0.955,
    height: SCREEN_W * 0.53
  },
  imageFullWidth: {
    height: SCREEN_W * 0.5,
    width: SCREEN_W * 0.955
  },
  youtubeIcon: {
    flex: 1,
    color: '#c4302b',
    alignSelf: 'center',
    fontSize: 60,
    marginTop: SCREEN_W * 0.124
  }
});
