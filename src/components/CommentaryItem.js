import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HELVETICA } from '../constants/fonts';
import { isNullOrEmpty } from '../utils';

export default props => {
  const { ToolTipString, ToolTipString1, Overs } = props.data;
  console.log(props.data);
  return (
    <View style={styles.mainView}>
      <View style={{ flex: 1 }}>
        <Text style={styles.commentaryText} numberOfLines={2}>
          {ToolTipString}
        </Text>
      </View>
      {!isNullOrEmpty(ToolTipString1) && (
        <View style={{ flex: 1 }}>
          <Text style={styles.commentaryText} numberOfLines={2}>
            {ToolTipString1}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    height: 35,
    marginLeft: 10,
    marginRight: 10
  },
  commentaryText: {
    color: 'white',
    fontFamily: HELVETICA
  }
});
