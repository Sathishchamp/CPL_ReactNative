import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import VideoCover from './VideoCover';

export default props => (
  <View>
    <FlatList
      data={props.data}
      showsHorizontalScrollIndicator={false}
      horizontal={props.horizontal}
      renderItem={({ item }) => (
        <VideoCover
          thumbnail={item.thumbnail}
          title={item.title}
          publishedAt={item.publishedAt}
          onPress={() => props.onItemPress(item.videoId)}
          horizontal={props.horizontal}
        />
      )}
      keyExtractor={(item, index) => index}
    />
  </View>
);
