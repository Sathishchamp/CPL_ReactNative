import React from 'react';
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';
import { WHITE } from '../config/colors';

const SCREEN_W = Dimensions.get('screen').width;

export default props => {
  const { playerImage, firstName, lastName, isEmpty } = props.data;
  if (isEmpty) {
    return <View style={[styles.mainView]} />;
  }
  return (
    <View style={[styles.mainView, { backgroundColor: props.backgroundColor }]}>
      <Image
        source={{ uri: playerImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.nameView}>
        <View style={{ flex: 1 }}>
          <Text style={{ alignSelf: 'center' }}>{firstName}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ alignSelf: 'center', fontWeight: '700' }}>
            {lastName}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    height: SCREEN_W * 0.6,
    width: SCREEN_W * 0.425,
    borderRadius: 10
  },
  image: {
    height: SCREEN_W * 0.5,
    width: SCREEN_W * 0.4,
    flex: 3,
    alignSelf: 'center'
  },
  nameView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    marginBottom: 10,
    borderTopWidth: 4,
    borderTopColor: 'red'
  }
});
