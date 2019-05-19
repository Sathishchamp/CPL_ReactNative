import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { TAB_BG } from '../config/colors';

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
                {item.player}
              </Text>
              <Text style={styles.rowText}>{item.status}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item.r}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item.b}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item.fours}</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.rowText}>{item.sixes}</Text>
            </View>
            <View style={[styles.colValue, { flex: 2 }]}>
              <Text style={styles.rowText}>{item.sr}</Text>
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
    fontWeight: 'bold',
    fontSize: 16
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
    flexDirection: 'row'
  },
  colPlayerWithStatus: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  rowText: {
    color: 'white'
  },
  playerText: { fontWeight: '600' },
  dataRow: {
    marginTop: 4,
    marginBottom: 4
  }
});
