import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import APIService from '../services/APIService';
import { connect } from 'react-redux';
import commonStyles from '../commons/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { translateArrayToJSON } from '../utils/CompDataParser';
import MatchCard from '../components/LiveMatchCard';
import { VIEW_ARCHIVE_MATCH_CENTER } from '../constants/viewNames';
import { SPINNER_COLOR } from '../config/colors';

class ArchiveDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      matchData: []
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
    const compId = this.props.navigation.getParam('compId');
    const url = this.props.serverUrl + compId + '/Competition.json';
    APIService.getCompData(url, (err, compData) => {
      if (!err) {
        const matchData = translateArrayToJSON(compData.LtFixtures);
        console.log(matchData);
        this.setState({ spinner: false, matchData });
      } else {
        this.setState({ spinner: false });
      }
    });
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} color={SPINNER_COLOR} />
    );
  }

  render() {
    return (
      <Container>
        <Content style={commonStyles.content}>
          <View>
            <FlatList
              data={this.state.matchData}
              renderItem={({ item }) => (
                <MatchCard
                  data={item}
                  showRR={true}
                  disableNavigation={false}
                  onCardPress={matchId =>
                    this.props.navigation.navigate(VIEW_ARCHIVE_MATCH_CENTER, {
                      matchId,
                      matchState: null,
                      compId: this.props.navigation.getParam('compId')
                    })
                  }
                />
              )}
              keyExtractor={({ item, index }) => index}
            />
          </View>
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

export const mapStateToProps = state => ({
  serverUrl: state.serverUrl
});

export default connect(mapStateToProps)(ArchiveDetails);
