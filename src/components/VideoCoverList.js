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
          thumbnail={item.thumbnail}
          title={item.title}
          publishedAt={item.publishedAt}
          onPress={() => props.onItemPress(item.videoId)}
        />
      )}
      keyExtractor={(item, index) => index}
    />
  </View>
);
