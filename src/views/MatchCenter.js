import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Container, Content, Tab, Tabs } from 'native-base';
import commonStyles from '../commons/styles';
import { PRIMARY, TAB_BG } from '../config/colors';
import { isEqual } from '../utils';
import MatchInfoCard from '../components/MatchInfoCard';
import TeamTabs from '../components/TeamTabs';

class MatchCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeInfoTab: 1
    };
  }

  _withContent(content) {
    return (
      <Content padder style={commonStyles.content}>
        {content}
      </Content>
    );
  }

  _withTab(heading, content) {
    return (
      <Tab
        heading={heading}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        textStyle={styles.textStyle}
        activeTextStyle={styles.textStyle}
      >
        {content}
      </Tab>
    );
  }

  _renderInfo() {
    const { activeInfoTab } = this.state;

    const tempPlayersListA = [
      'RG Sharma',
      'SA Yadav',
      'Ishan Kishan',
      'KH Pandia',
      'MJ McClenaghan'
    ];
    const tempPlayersListB = [
      'Dhoni',
      'KA Pollard',
      'RD Chahar',
      'JJ Bhumrah',
      'SL Malinga'
    ];

    const playersList = isEqual(activeInfoTab, 1)
      ? tempPlayersListA
      : tempPlayersListB;

    return this._withContent(
      <View style={infoStyles.mainView}>
        <MatchInfoCard />
        <View style={infoStyles.playingXiView}>
          <Text style={infoStyles.playingXiText}>PLAYING XI</Text>
        </View>
        <TeamTabs
          teamA="Mumbai Indians"
          teamB="Chennai Super Kings"
          onTabPress={activeInfoTab => this.setState({ activeInfoTab })}
        />
        <View>
          <FlatList
            data={playersList}
            keyExtractor={(index, item) => index}
            renderItem={({ item, index }) => (
              <View style={infoStyles.infoPlayerListItem}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white' }}>
                    {parseInt(index + 1) + '.'}
                  </Text>
                </View>
                <View style={{ flex: 12 }}>
                  <Text style={{ color: 'white' }}>{item}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  _renderScoreCard() {
    return this._withContent(
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>Scorecard</Text>
      </View>
    );
  }

  _renderTimeline() {
    return this._withContent(
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>Timeline</Text>
      </View>
    );
  }

  _renderFullCommentary() {
    return this._withContent(
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>Full Commentary</Text>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        <Tabs
          style={{ flex: 1 }}
          tabBarUnderlineStyle={{ borderBottomColor: '#267fff' }}
        >
          {this._withTab('INFO', this._renderInfo())}
          {this._withTab('SCORECARD', this._renderScoreCard())}
          {this._withTab('TIMELINE', this._renderTimeline())}
          {this._withTab('FULL COMMENTARY', this._renderFullCommentary())}
        </Tabs>
      </Container>
    );
  }
}

export default MatchCenter;

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: TAB_BG
  },
  activeTabStyle: {
    backgroundColor: TAB_BG
  },
  textStyle: {
    color: 'white',
    fontSize: 12
  }
});

const infoStyles = StyleSheet.create({
  mainView: { flex: 1 },
  playingXiView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  playingXiText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  },

  infoPlayerListItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 5
  }
});
