import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Container, Content } from 'native-base';
import APIService from '../services/APIService';
import commonStyles from '../commons/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { HELVETICA } from '../constants/fonts';
import { VIEW_ARCHIVE_DETAILS } from '../constants/viewNames';
import { SPINNER_COLOR } from '../config/colors';

class Archives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      archives: []
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
    APIService.getArchives(data => {
      console.log(data);
      this.setState({ spinner: false, archives: data.yearConfig });
    });
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} color={SPINNER_COLOR} />
    );
  }

  _renderArchivesItem(item) {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.archivesItemView}
        onPress={() =>
          this.props.navigation.navigate(VIEW_ARCHIVE_DETAILS, {
            title: item.year,
            compId: item.competitionId
          })
        }
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Image
            source={require('../../assets/images/cpl_archives.png')}
            resizeMode="contain"
            style={{ height: 45, width: 45 }}
          />
        </View>
        <View
          style={{
            flex: 4,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Text style={styles.archivesYearText}>{item.year}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <Content style={commonStyles.content}>
          <View>
            <FlatList
              data={this.state.archives}
              renderItem={({ item }) => this._renderArchivesItem(item)}
              keyExtractor={({ item, index }) => index}
            />
          </View>
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

export default Archives;

const styles = StyleSheet.create({
  archivesItemView: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    paddingLeft: 30
  },
  archivesYearText: {
    fontFamily: HELVETICA,
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  }
});
