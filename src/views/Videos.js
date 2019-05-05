import React from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { VIEW_VIDEOS } from '../constants/viewNames';
import { VIDEOS } from '../constants/strings';
import VideoCoverList from '../components/VideoCoverList';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      APIService.getVideosFeed(playlistData => {
        const items = playlistData.items;
        const videoData = items.map(item => {
          const { publishedAt, resourceId, thumbnails, title } = item.snippet;
          return {
            title,
            publishedAt,
            videoId: resourceId.videoId,
            thumbnail: thumbnails.high.url
          };
        });
        this.props.setVideoData(videoData);
        this.setState({ refreshing: false });
      });
    });
  };

  render() {
    return (
      <Container>
        <Header title={VIDEOS} />
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View>
            <VideoCoverList
              data={this.props.videos}
              onItemPress={videoId => alert(videoId)}
            />
          </View>
        </Content>
        <Footer activeButton={VIEW_VIDEOS} {...this.props} />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  videos: state.videos
});
export default connect(
  mapStateToProps,
  Actions
)(Videos);

const styles = StyleSheet.create({});
