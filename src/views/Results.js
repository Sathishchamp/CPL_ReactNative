import React from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  Platform,
  Text,
  FlatList,
  Alert,
  Dimensions,
  WebView
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import APIService from '../services/APIService';
import { isNullOrEmpty } from '../utils';
import Spinner from 'react-native-loading-spinner-overlay';
import commonStyles from '../commons/styles';
import { translateArrayToJSON } from '../utils/CompDataParser';
import {
  STATUS_LIVE,
  STATUS_COMPLETED,
  STATUS_CANCELLED
} from '../constants/matchStatus';
import { STATUS_BAR_HEIGHT } from '../components/BannerHeader';
import ResultCard from '../components/ResultCard';
import { VIEW_ARCHIVE_MATCH_CENTER } from '../constants/viewNames';

const SCREEN_H = Dimensions.get('screen').height;

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: []
    };
  }

  componentDidMount() {
    this._fetchResults();
  }

  _fetchResults() {
    const API_URL =
      this.props.serverUrl +
      this.props.currentCompetitionId +
      '/Competition.json';
    if (!isNullOrEmpty(API_URL)) {
      this.setState({ loading: true }, () =>
        APIService.getResults(API_URL, data => {
          const matches = translateArrayToJSON(data.LtFixtures);
          matches.filter(
            match =>
              (match.state === STATUS_LIVE) |
              STATUS_COMPLETED |
              STATUS_CANCELLED
          );
          this.setState({ loading: false, results: matches });
        })
      );
    }
  }
  _renderSpinner() {
    return (
      <Spinner visible={this.state.loading} textStyle={{ color: 'white' }} />
    );
  }
  render() {
    return (
      <Container>
        <Content style={commonStyles.content}>
          {this._renderSpinner()}
          <FlatList
            data={this.state.results}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <ResultCard
                  data={item}
                  keyExtractor={({ item, index }) => index}
                  onCardPress={() =>
                    this.props.navigation.navigate(VIEW_ARCHIVE_MATCH_CENTER, {
                      matchId: item.matchId,
                      matchState: null,
                      compId: this.props.currentCompetitionId
                    })
                  }
                />
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentCompetitionId: state.currentCompetitionId,
  serverUrl: state.serverUrl
});
export default connect(mapStateToProps)(Results);
