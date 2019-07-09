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
import FixtureItem from '../components/FixtureItem';

class Fixtures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      fixtures: []
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
    const {
      isFixturesUpcoming,
      currentCompetitionId,
      upcomingCompetitionId,
      serverUrl
    } = this.props;
    let compId = currentCompetitionId;
    if (isFixturesUpcoming) {
      compId = upcomingCompetitionId;
    }
    APIService.getCompData(
      serverUrl + compId + '/Competition.json',
      (err, compData) => {
        let fixtures = [];
        if (err) {
        } else {
          fixtures = translateArrayToJSON(compData.LtFixtures);
        }
        this.setState({ spinner: false, fixtures });
      }
    );
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
          <View>
            <FlatList
              data={this.state.fixtures}
              renderItem={({ item }) => <FixtureItem data={item} />}
              keyExtractor={({ item, index }) => index}
            />
          </View>
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isFixturesUpcoming: state.isFixturesUpcoming,
  currentCompetitionId: state.currentCompetitionId,
  upcomingCompetitionId: state.upcomingCompetitionId,
  serverUrl: state.serverUrl
});

export default connect(mapStateToProps)(Fixtures);
