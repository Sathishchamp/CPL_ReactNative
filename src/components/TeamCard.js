import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const SCREEN_W = Dimensions.get('screen').width;

export default props => {
  const { TeamImage, ID } = props.data;
  return (
    <TouchableOpacity
      style={[styles.mainView, { backgroundColor: props.backgroundColor }]}
      onPress={() => props.onPress(ID)}
    >
      <Image
        source={{
          uri: TeamImage
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    margin: 4,
    height: SCREEN_W * 0.425,
    width: SCREEN_W * 0.425,
    borderRadius: 10
  },
  image: {
    height: SCREEN_W * 0.25,
    width: SCREEN_W * 0.25,
    flex: 1,
    alignSelf: 'center'
  }
});
