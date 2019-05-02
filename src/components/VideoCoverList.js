import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import VideoCover from './VideoCover';

export default props => (
  <View>
    <FlatList
      data={props.data}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <VideoCover
          image={item.image}
          text={item.text}
          onPress={() => props.onItemPress(item.id)}
        />
      )}
      keyExtractor={(item, index) => index}
    />
  </View>
);
