import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { TAB_BG } from '../config/colors';
import { HELVETICA, SQUARE721 } from '../constants/fonts';

export default props => {
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.row, styles.titleRow]}>
        <View style={styles.colPlayer}>
          <Text style={styles.titleText}>Batting</Text>
        </View>
        <View style={styles.colValue}>
          <Text style={styles.titleText}>R</Text>
        </View>
        <View style={styles.colValue}>
          <Text style={styles.titleText}>B</Text>
        </View>
        <View style={styles.colValue}>
          <Text style={styles.titleText}>4s</Text>
        </View>
        <View style={styles.colValue}>
          <Text style={styles.titleText}>6s</Text>
        </View>
        <View style={[styles.colValue, { flex: 2 }]}>
          <Text style={styles.titleText}>SR</Text>
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
              <Text style={styles.rowText}>{item.Dismissal}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item.Runs}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item.Balls}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item['4s']}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item['6s']}</Text>
            </View>
            <View style={[styles.colValue, { flex: 2 }]}>
              <Text style={styles.rowText}>{item.SR}</Text>
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
    fontSize: 16,
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
    fontFamily: HELVETICA
  },
  playerText: { fontWeight: '600' },
  dataRow: {
    marginTop: 4,
    marginBottom: 4
  }
});
