import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import commonStyles from '../commons/styles';
import APIService from '../services/APIService';
import { connect } from 'react-redux';
import { translateArrayToJSON } from '../utils/CompDataParser';
import {
  BG_KNIGHT_RIDERS,
  BG_TALLAWAHS,
  BG_AMAZON_WARRIORS,
  BG_TRIDENTS,
  BG_STARS,
  BG_PATRIOTS
} from '../config/colors';
import PlayerCard from '../components/PlayerCard';
import { isEqual } from '../utils';
import Spinner from 'react-native-loading-spinner-overlay';
import { isNullOrEmpty } from '../utils';

class TeamPlayers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      playerProfiles: [],
      backgroundColor: null
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    const teamId = this.props.navigation.getParam('teamId');
    const backgroundColor = this._getBackgorundColor(teamId);
    if (!isNullOrEmpty(this.props.playerProfileUrl)) {
      let url = this.props.playerProfileUrl + `/${teamId}_.json`;
      console.log(url);
      this.setState({ spinner: true }, () =>
        APIService.getPlayerList(url, (err, data) => {
          if (!err) {
            console.log(data);
            let playerProfiles = Object.keys(data.LtPlayerDetails).map(
              key => data.LtPlayerDetails[key]
            );
            playerProfiles = playerProfiles
              .map(profile => translateArrayToJSON(profile.PlayerDetails)[0])
              .map(profile => ({
                playerId: profile.ID,
                firstName: profile.FirstName,
                lastName: profile.LastName,
                playerImage: profile.PlayerImage
              }));
            if (isEqual(playerProfiles.length % 2, 1)) {
              playerProfiles.push({
                isEmpty: true
              });
            }
            console.log(playerProfiles);
            this.setState({ playerProfiles, backgroundColor, spinner: false });
          } else {
            this.setState({ spinner: false });
          }
        })
      );
    }
  }

  _getBackgorundColor(teamId) {
    switch (teamId) {
      case '58':
        return BG_KNIGHT_RIDERS;
      case '90':
        return BG_TALLAWAHS;
      case '92':
        return BG_AMAZON_WARRIORS;
      case '94':
        return BG_TRIDENTS;
      case '264':
        return BG_STARS;
      case '349':
        return BG_PATRIOTS;
      default:
        return BG_KNIGHT_RIDERS;
    }
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: 'white' }} />
    );
  }

  render() {
    return (
      <Container>
        <Content padder style={commonStyles.content}>
          <View>
            <FlatList
              data={this.state.playerProfiles}
              renderItem={({ item }) => (
                <PlayerCard
                  data={item}
                  backgroundColor={this.state.backgroundColor}
                />
              )}
              numColumns={2}
            />
          </View>
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  competitionUrl: state.competitionUrl,
  playerProfileUrl: state.playerProfileUrl
});

export default connect(mapStateToProps)(TeamPlayers);
