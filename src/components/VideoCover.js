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
import {
  SHADOW_COLOR,
  CARD_BG_COLOR,
  CARD_TEXT_COLOR,
  VIEW_BG_COLOR,
  WHITE
} from '../config/colors';
import moment from 'moment';

const SCREEN_W = Dimensions.get('screen').width;

export default props => {
  const { thumbnail, onPress, videoId, title, publishedAt } = props;
  let coverWidth = styles.coverFullWidth;
  if (props.horizontal) {
    coverWidth = styles.coverSmallWidth;
  }
  let imageWidth = styles.imageFullWidth;
  if (props.horizontal) {
    imageWidth = styles.imageSmallWidth;
  }

  if (props.isReadMore === undefined) {
    const pubDateString = moment(new Date(publishedAt)).format(
      'ddd, DD MMM YYYY HH:mm:ss'
    );
    return (
      <TouchableOpacity onPress={() => onPress(videoId)}>
        <View style={[styles.videoCover, coverWidth]}>
          <ImageBackground
            source={{ uri: thumbnail }}
            resizeMode="cover"
            style={[styles.image, imageWidth]}
          >
            <Icon
              name="youtube"
              type="MaterialCommunityIcons"
              style={styles.youtubeIcon}
            />
          </ImageBackground>
          <View
            style={{
              flex: 2,
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Text
              style={styles.videoText}
              numberOfLines={2}
              ellipsizeMode="tail"
              allowFontScaling={true}
            >
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
  }

  return (
    <View
      style={[
        styles.videoCover,
        coverWidth,
        styles.readMoreWidth,
        styles.readMoreMainView
      ]}
    >
      <TouchableOpacity
        style={styles.readMoreTouchable}
        onPress={() => props.onReadMorePress()}
      >
        <Text style={{ color: WHITE }}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  videoCover: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: CARD_BG_COLOR,
    borderRadius: 5,
    elevation: 4,
    shadowOffset: { height: 4, width: 4 },
    shadowOpacity: 0.8
    // shadowColor: SHADOW_COLOR
  },
  image: {
    flex: 4,
    borderRadius: 5,
    overflow: 'hidden'
  },
  videoText: {
    flex: 1,
    margin: 5,
    fontSize: 11,
    color: CARD_TEXT_COLOR
  },
  pubDateText: {
    flex: 1,
    margin: 5,
    fontSize: 11,
    color: CARD_TEXT_COLOR
  },
  coverSmallWidth: {
    width: SCREEN_W * 0.65,
    height: SCREEN_W * 0.43
  },
  coverFullWidth: {
    width: SCREEN_W * 0.955,
    height: SCREEN_W * 0.53
  },
  imageFullWidth: {
    height: SCREEN_W * 0.5,
    width: SCREEN_W * 0.955
  },
  imageSmallWidth: {
    height: SCREEN_W * 0.35,
    width: SCREEN_W * 0.65
  },
  youtubeIcon: {
    flex: 1,
    color: CARD_TEXT_COLOR,
    alignSelf: 'center',
    fontSize: 60,
    marginTop: SCREEN_W * 0.124
  },
  readMoreMainView: {
    backgroundColor: VIEW_BG_COLOR
  },
  readMoreTouchable: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  readMoreWidth: {
    width: 50
  }
});
