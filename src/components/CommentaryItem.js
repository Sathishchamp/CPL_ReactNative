import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HELVETICA } from '../constants/fonts';
import { isNullOrEmpty, isEqual } from '../utils';

const OUT = 'OUT';
const FOUR = 'FOUR';
const SIX = 'SIX';

export default props => {
  const { ToolTipString, ToolTipString1, Overs } = props.data;
  let commentaryText = ToolTipString.slice(5);
  let runComment = '';
  let runCommentDisplay = null;

  const isRunCommentExists =
    commentaryText.includes(OUT) ||
    commentaryText.includes(FOUR) ||
    commentaryText.includes(SIX);
  if (isRunCommentExists) {
    const splitStr = commentaryText.split(',');
    commentaryText = splitStr[0] + ',';
    runComment = splitStr[1];

    if (runComment.includes(OUT)) {
      runCommentDisplay = (
        <Text>
          <Text style={{ color: 'red' }}>{' ' + OUT}</Text>
          {' ' + runComment.slice(4) + '.'}
        </Text>
      );
    }

    if (runComment.includes(FOUR)) {
      runCommentDisplay = (
        <Text>
          <Text style={{ color: '#186bf2' }}>{' ' + FOUR}</Text>
          {' ' + runComment.slice(5) + '.'}
        </Text>
      );
    }

    if (runComment.includes(SIX)) {
      runCommentDisplay = (
        <Text>
          <Text style={{ color: '#2ea30e' }}>{' ' + SIX}</Text>
          {' ' + runComment.slice(4) + '.'}
        </Text>
      );
    }
  }

  return (
    <View style={styles.mainView}>
      <View style={{ flex: 1 }}>
        <Text style={styles.commentaryText} numberOfLines={2}>
          <Text style={{ fontWeight: '600' }}>{Overs}</Text>
          {commentaryText}
          {isRunCommentExists && runCommentDisplay}
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
