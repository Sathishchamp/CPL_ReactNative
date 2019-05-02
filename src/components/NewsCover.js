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

const SCREEN_W = Dimensions.get('screen').width;

export default props => {
  let coverWidth = styles.coverSmallWidth;
  let imageWidth = styles.imageSmallWidth;
  if (props.isFull) {
    coverWidth = styles.coverFullWidth;
    imageWidth = styles.imageFullWidth;
  }
  let pubDateString = moment(new Date(props.pubDate)).format(
    'ddd, DD MMM YYYY HH:mm:ss'
  );
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={[styles.newsCover, coverWidth]}>
        <Image
          source={{ uri: props.image }}
          resizeMode='cover'
          style={[styles.image, imageWidth]}
        />
        <Text style={styles.newsText} numberOfLines={2} ellipsizeMode='tail'>
          {props.title}
        </Text>
        <Text style={styles.pubDateText}>{pubDateString}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newsCover: {
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
    shadowColor: 'grey'
  },
  image: {
    flex: 9,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  newsText: {
    flex: 2,
    marginLeft: 5,
    marginRight: 5,
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
  coverSmallWidth: {
    width: SCREEN_W * 0.65,
    height: SCREEN_W * 0.43
  },
  imageSmallWidth: {
    height: SCREEN_W * 0.35,
    width: SCREEN_W * 0.65
  }
});
