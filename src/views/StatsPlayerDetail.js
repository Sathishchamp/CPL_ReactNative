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
import APIService from '../services/APIService';
import { connect } from 'react-redux';
import commonStyles from '../commons/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { translateArrayToJSON } from '../utils/CompDataParser';

class StatsPlayerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  componentDidMount() {
    this.setState(
      {
        spinner: true
      },
      () => this._fetchData()
    );
  }

  _fetchData() {
    const teamId = this.props.navigation.getParam('teamId');
    const playerId = this.props.navigation.getParam('playerId');
    let url = this.props.playerProfileUrl + `/${teamId}_.json`;
    console.log(url);
    APIService.getPlayerList(url, data => {
      console.log(data);
      this.setState({ spinner: false });
    });
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: 'white' }} />
    );
  }

  render() {
    return (
      <Container>
        <Content style={commonStyles.content}>
          <View />
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  playerProfileUrl: state.playerProfileUrl
});

export default connect(mapStateToProps)(StatsPlayerDetail);
