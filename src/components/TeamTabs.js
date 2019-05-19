import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TAB_BG } from '../config/colors';
import { isEqual } from '../utils';

export default props => {
  const { teamA, teamB, onTabPress } = props;
  const [activeInfoTab, setActiveInfoTab] = useState(1);

  const teamAbuttonBg = isEqual(activeInfoTab, 1)
    ? infoStyles.activeInfoTabView
    : infoStyles.inactiveInfoTabView;

  const teamBbuttonBg = isEqual(activeInfoTab, 2)
    ? infoStyles.activeInfoTabView
    : infoStyles.inactiveInfoTabView;

  const teamATextColor = isEqual(activeInfoTab, 1)
    ? infoStyles.activeInfoTabText
    : infoStyles.inactiveInfoTabText;

  const teamBTextColor = isEqual(activeInfoTab, 2)
    ? infoStyles.activeInfoTabText
    : infoStyles.inactiveInfoTabText;

  return (
    <View style={infoStyles.teamsTabButtonView}>
      <TouchableOpacity
        style={[infoStyles.teamsTabButton, teamAbuttonBg]}
        onPress={() => {
          setActiveInfoTab(1);
          onTabPress(1);
        }}
      >
        <Text style={[infoStyles.teamsTabButtonText, teamATextColor]}>
          {teamA}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[infoStyles.teamsTabButton, teamBbuttonBg]}
        onPress={() => {
          setActiveInfoTab(2);
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
  activeInfoTabView: { backgroundColor: TAB_BG },
  inactiveInfoTabView: { backgroundColor: 'white' },
  activeInfoTabText: { color: 'white' },
  inactiveInfoTabText: { color: TAB_BG }
});
