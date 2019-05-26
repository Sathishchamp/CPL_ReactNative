import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TAB_BG } from '../config/colors';
import { isEqual } from '../utils';

export default props => {
  const { teamA, teamB, onTabPress } = props;
  const [activeTab, setActiveTab] = useState(1);

  const teamAbuttonBg = isEqual(activeTab, 1)
    ? infoStyles.activeTabView
    : infoStyles.inactiveTabView;

  const teamBbuttonBg = isEqual(activeTab, 2)
    ? infoStyles.activeTabView
    : infoStyles.inactiveTabView;

  const teamATextColor = isEqual(activeTab, 1)
    ? infoStyles.activeTabText
    : infoStyles.inactiveTabText;

  const teamBTextColor = isEqual(activeTab, 2)
    ? infoStyles.activeTabText
    : infoStyles.inactiveTabText;

  return (
    <View style={infoStyles.teamsTabButtonView}>
      <TouchableOpacity
        disabled={isEqual(activeTab, 1)}
        style={[infoStyles.teamsTabButton, teamAbuttonBg]}
        onPress={() => {
          setActiveTab(1);
          onTabPress(1);
        }}
      >
        <Text style={[infoStyles.teamsTabButtonText, teamATextColor]}>
          {teamA}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isEqual(activeTab, 2)}
        style={[infoStyles.teamsTabButton, teamBbuttonBg]}
        onPress={() => {
          setActiveTab(2);
          onTabPress(2);
        }}
      >
        <Text style={[infoStyles.teamsTabButtonText, teamBTextColor]}>
          {teamB}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const infoStyles = StyleSheet.create({
  teamsTabButtonView: {
    flex: 1,
    flexDirection: 'row',
    margin: 10
  },
  teamsTabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15
  },
  teamsTabButtonText: {
    fontSize: 14,
    fontWeight: '600'
  },
  activeTabView: { backgroundColor: TAB_BG },
  inactiveTabView: { backgroundColor: 'white' },
  activeTabText: { color: 'white' },
  inactiveTabText: { color: TAB_BG }
});
