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
import PodcastsCover from '../components/PodcastsCover';

export default class Podcasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      audios: []
    };
  }
  componentDidMount() {
    this._fetchPodcasts();
  }
  componentWillUnmount() {}
  _fetchPodcasts() {
    this.setState({ loading: true }, () =>
      APIService.getPodcasts(audioList => {
        console.log('audio', audioList);
        this.setState({ loading: false, audios: audioList });
      })
    );
  }
  render() {
    return (
      <FlatList
        data={this.state.audios}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <PodcastsCover
              data={item}
              keyExtractor={({ item, index }) => index}
              onPress={(audioUrl, isPlaying) => {
                
              }}
            />
          );
        }}
      />
    );
  }
}
