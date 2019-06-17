import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import {
  SHADOW_COLOR,
  CARD_BG_COLOR,
  CARD_TEXT_COLOR,
  BACKGROUND,
  WHITE,
  VIEW_BG_COLOR
} from '../config/colors';
import { VAGROUND } from '../constants/fonts';

const SCREEN_W = Dimensions.get('screen').width;

export default props => {
  let coverWidth = styles.coverSmallWidth;
  let imageWidth = styles.imageSmallWidth;
  if (props.isFull) {
    coverWidth = styles.coverFullWidth;
    imageWidth = styles.imageFullWidth;
  }
  if (props.isReadMore === undefined) {
    // const pubDateString = moment(new Date(props.pubDate)).format(
    //   'ddd, DD MMM YYYY HH:mm:ss'
    // );
    return (
      <TouchableOpacity onPress={() => props.onPress()}>
        <View style={[styles.newsCover, coverWidth]}>
          <View style={styles.imageView}>
            <Image
              source={{ uri: props.image }}
              resizeMode="cover"
              style={[imageWidth, styles.image]}
            />
          </View>
          <View style={{ flex: 3, justifyContent: 'center', paddingTop: 5 }}>
            <Text
              style={styles.newsText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {props.title}
            </Text>
            {/* <Text style={styles.pubDateText}>{pubDateString}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.readMoreWidth, styles.readMoreMainView]}>
      <TouchableOpacity
        style={styles.readMoreTouchable}
        onPress={() => props.onReadMorePress()}
      >
        <Image
          source={require('../../assets/images/more.png')}
          resizeMode="contain"
          style={{ height: 20, width: 20, transform: [{ rotate: '90deg' }] }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  newsCover: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: CARD_BG_COLOR,
    borderRadius: 5,
    // elevation: 4,
    // shadowOffset: { height: 4, width: 4 },
    // shadowOpacity: 0.8
    // shadowColor: SHADOW_COLOR
  },
  imageView: {
    borderRadius: 5,
    flex: 9,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  newsText: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 12,
    color: CARD_TEXT_COLOR,
    fontFamily: VAGROUND
  },
  // pubDateText: {
  //   flex: 1,
  //   margin: 5,
  //   fontSize: 12,
  //   color: CARD_TEXT_COLOR
  // },
  coverFullWidth: {
    width: SCREEN_W * 0.955,
    height: SCREEN_W * 0.5
  },
  imageFullWidth: {
    height: SCREEN_W * 0.5,
    width: SCREEN_W * 0.955
  },
  coverSmallWidth: {
    width: SCREEN_W * 0.65,
    height: SCREEN_W * 0.43
  },
  imageSmallWidth: {
    height: SCREEN_W * 0.35,
    width: SCREEN_W * 0.65
  },
  readMoreMainView: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
    marginLeft: 8,
    marginRight: 8
  },
  readMoreTouchable: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  readMoreWidth: {
    height: 50
  }
});
