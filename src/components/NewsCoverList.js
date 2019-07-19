import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import NewsCover from './NewsCover';

export default props => {
  const { data, horizontal, showReadMore } = props;
  if (showReadMore) {
    data.push({ isReadMore: true });
  }
  return (
    <View>
      <FlatList
        data={data}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          if (item.isReadMore === undefined) {
            return (
              <NewsCover
                image={item.image}
                title={item.title}
                onPress={() => props.onItemPress(item.description)}
                isFull={!horizontal}
                pubDate={item.pubDate}
              />
            );
          }
          return (
            <NewsCover
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
