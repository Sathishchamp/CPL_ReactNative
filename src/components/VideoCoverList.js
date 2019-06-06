import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import VideoCover from './VideoCover';

export default props => {
  const { data, horizontal, showReadMore } = props;
  if (showReadMore) {
    data.push({ isReadMore: true });
  }
  return (
    <View>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={horizontal}
        renderItem={({ item }) => {
          if (item.isReadMore === undefined) {
            return (
              <VideoCover
                thumbnail={item.thumbnail}
                title={item.title}
                publishedAt={item.publishedAt}
                onPress={() => props.onItemPress(item.videoId)}
                horizontal={horizontal}
              />
            );
          }
          return (
            <VideoCover
              isReadMore={true}
              isFull={!horizontal}
              onReadMorePress={() => props.onReadMorePress()}
            />
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};
