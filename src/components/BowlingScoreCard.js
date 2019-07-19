import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { TAB_BG } from '../config/colors';
import { HELVETICA, SQUARE721 } from '../constants/fonts';

export default props => {
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.row, styles.titleRow]}>
        <View style={styles.colPlayer}>
          <Text style={styles.titleText}>Bowling</Text>
        </View>
        <View style={styles.colValue}>
          <Text style={styles.titleText}>O</Text>
        </View>
        <View style={styles.colValue}>
          <Text style={styles.titleText}>M</Text>
        </View>
        <View style={styles.colValue}>
          <Text style={styles.titleText}>R</Text>
        </View>
        <View style={styles.colValue}>
          <Text style={styles.titleText}>W</Text>
        </View>
        <View style={[styles.colValue, { flex: 2 }]}>
          <Text style={styles.titleText}>ECON</Text>
        </View>
      </View>
      <FlatList
        data={props.data}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View style={[styles.row, styles.dataRow]}>
            <View style={[styles.colPlayer, styles.colPlayerWithStatus]}>
              <Text style={[styles.rowText, styles.playerText]}>
                {item.Player}
              </Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item.Overs}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item.Maiden}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item.Runs}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item.Wickets}</Text>
            </View>
            <View style={[styles.colValue, { flex: 2 }]}>
              <Text style={styles.rowText}>{item.Econ}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    fontSize: 13,
    fontFamily: SQUARE721
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 2
  },
  titleRow: {
    backgroundColor: TAB_BG
  },
  colValue: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  colPlayer: {
    flex: 5,
    flexDirection: 'row',
    paddingLeft: 4
  },
  colPlayerWithStatus: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  rowText: {
    color: 'white',
    fontFamily: HELVETICA,
    fontSize: 13
  },
  playerText: { fontWeight: '600' },
  dataRow: {
    marginTop: 4,
    marginBottom: 4
  }
});
