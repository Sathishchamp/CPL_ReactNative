import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Text
} from 'react-native';
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
import { VAGROUND, HELVETICA } from '../constants/fonts';

const height = Dimensions.get('window').height * 0.22;
const width = Dimensions.get('window').width;

class TeamPlayers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      playerProfiles: [],
      backgroundColor: null,
      coachDetails: {}
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
            const coachDetails = {
              coachImage: data.coachimage,
              coachName: data.coachname,
              assistantImage: data.assistantimage,
              assistantName: data.assistantname
            };
            this.setState({
              playerProfiles,
              backgroundColor,
              spinner: false,
              coachDetails
            });
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

  _renderCoachDetailsView(title, uri, name) {
    return (
      <View style={styles.coachDetailsMainView}>
        <View style={styles.coachTitleView}>
          <Text style={styles.coachTitleText}>{title}</Text>
        </View>
        <View style={styles.coachDetailsInnerView}>
          <View style={styles.coachImageView}>
            <Image
              source={{
                uri
              }}
              resizeMode="contain"
              style={styles.coachImage}
            />
          </View>
          <View style={styles.coachNameView}>
            <Text style={styles.coachNameText}>{name}</Text>
          </View>
        </View>
      </View>
    );
  }

  _renderCoachView() {
    const teamImage = this.props.navigation.getParam('teamImage');
    const { coachDetails } = this.state;
    return (
      <View
        style={[
          styles.coachView,
          {
            backgroundColor: this.state.backgroundColor
          }
        ]}
      >
        <View style={styles.teamImageView}>
          <Image
            source={{ uri: teamImage }}
            style={styles.teamImage}
            resizeMode="contain"
          />
        </View>
        {this._renderCoachDetailsView(
          'COACH',
          coachDetails.coachImage,
          coachDetails.coachName
        )}
        {this._renderCoachDetailsView(
          'ASSISTANT',
          coachDetails.assistantImage,
          coachDetails.assistantName
        )}
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Content style={commonStyles.content}>
          {this._renderCoachView()}
          <View style={{ padding: 10 }}>
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

const styles = StyleSheet.create({
  coachView: {
    height,
    width,
    flexDirection: 'row'
  },
  teamImageView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamImage: {
    height: height * 0.8,
    width: height * 0.8
  },
  coachDetailsMainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  coachTitleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4
  },
  coachTitleText: {
    fontFamily: VAGROUND,
    color: '#ffffff'
  },
  coachDetailsInnerView: {
    flex: 10,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 5,
    marginBottom: 10
  },
  coachImageView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#940a00'
  },
  coachImage: {
    height: height * 0.62,
    width: height * 0.62
  },
  coachNameView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  coachNameText: {
    fontFamily: HELVETICA,
    fontWeight: '500'
  }
});
