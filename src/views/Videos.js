import React from 'react';
import { View, StyleSheet, RefreshControl, Platform } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Footer from '../components/Footer';
import { VIEW_VIDEOS, VIEW_VIDEOS_VIDEOS_VIEW } from '../constants/viewNames';
import { VIDEOS } from '../constants/strings';
import VideoCoverList from '../components/VideoCoverList';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { YouTubeStandaloneIOS } from 'react-native-youtube';
import commonStyles from '../commons/styles';
import { isEqual } from '../utils';
import BannerHeader, { NAV_BAR_HEIGHT } from '../components/BannerHeader';

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
        <BannerHeader title={VIDEOS} />
        <Content
          style={[commonStyles.content, { marginTop: NAV_BAR_HEIGHT * 2 }]}
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
              horizontal={false}
              onItemPress={videoId => {
                if (isEqual(Platform.OS, 'ios')) {
                  YouTubeStandaloneIOS.playVideo(videoId)
                    .then(() => console.log('Standalone Player Exited'))
                    .catch(errorMessage => console.log(errorMessage));
                }
              }}
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
