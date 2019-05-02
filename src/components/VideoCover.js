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

const SCREEN_W = Dimensions.get('screen').width;

export default props => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={[styles.videoCover, styles.coverFullWidth]}>
        <ImageBackground
          source={{ uri: props.image }}
          resizeMode='cover'
          style={[styles.image, styles.imageFullWidth]}
        >
          <Icon
            name='youtube'
            type='MaterialCommunityIcons'
            style={styles.youtubeIcon}
          />
        </ImageBackground>
        <Text style={styles.videoText} numberOfLines={1} ellipsizeMode='tail'>
          {props.text}
        </Text>
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
    shadowColor: 'grey'
  },
  image: {
    flex: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  videoText: {
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
    color: 'white',
    alignSelf: 'center',
    fontSize: 60,
    marginTop: SCREEN_W * 0.124
  }
});
