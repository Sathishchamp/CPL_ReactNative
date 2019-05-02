import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import NewsCover from './NewsCover';

export default props => (
  <View>
    <FlatList
      data={props.data}
      horizontal={props.horizontal}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <NewsCover
          image={item.image}
          title={item.title}
          onPress={() => props.onItemPress(item.description)}
          isFull={!props.horizontal}
          pubDate={item.pubDate}
        />
      )}
      keyExtractor={(item, index) => index}
    />
  </View>
);
