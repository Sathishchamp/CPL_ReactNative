import React from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  Platform,
  Text,
  FlatList,
  Alert
} from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import commonStyles from '../commons/styles';
import StatsPlayerDetailItem from '../components/StatsPlayerDetailItem';
import { VIEW_STATS_PLAYER_DETAIL } from '../constants/viewNames';
import { BG_GREY } from '../config/colors';

class StatsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  componentDidMount() {
    const key = this.props.navigation.getParam('key');
    console.log(this.props.allStats[key]);
    this.setState({ players: this.props.allStats[key] });
  }

  render() {
    return (
      <Container>
        <Content style={[commonStyles.content, { backgroundColor: BG_GREY }]}>
          <View>
            <FlatList
              data={this.state.players}
              renderItem={({ item, index }) => (
                <StatsPlayerDetailItem
                  data={item}
                  count={index + 1}
                  onPress={(playerName, teamId, playerId) =>
                    this.props.navigation.navigate(VIEW_STATS_PLAYER_DETAIL, {
                      title: playerName,
                      teamId,
                      playerId
                    })
                  }
                />
              )}
              keyExtractor={({ item, index }) => index}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  allStats: state.allStats
});

export default connect(mapStateToProps)(StatsDetails);
