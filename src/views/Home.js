import React from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { VIEW_HOME, VIEW_HOME_NEWS_VIEW } from '../constants/viewNames';
import { HOME } from '../constants/strings';
import NewsCoverList from '../components/NewsCoverList';
import APIService from '../services/APIService';
import XMLParser from 'react-native-xml2js';
import VideoCoverList from '../components/VideoCoverList';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { isNullOrEmpty } from '../utils';
import Spinner from 'react-native-loading-spinner-overlay';
import { YouTubeStandaloneIOS } from 'react-native-youtube';
import commonStyles from '../commons/styles';
import { translateArrayToJSON } from '../utils/CompDataParser';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      refreshing: false
    };
  }

  componentDidMount() {
    if (isNullOrEmpty(this.props.news) || isNullOrEmpty(this.props.videos)) {
      this.setState({ spinner: true }, () => {
        this._fetchData();
      });
    }
  }

  _fetchData() {
    const newsPromise = new Promise((resolve, reject) => {
      APIService.getNewsFeed(xmlData => {
        XMLParser.parseString(xmlData, (err, jsonData) => {
          let newsItems = jsonData.rss.channel[0].item;
          newsItems = newsItems.map(item => ({
            title: item.title[0],
            pubDate: item.pubDate[0],
            description: item.description[0]
          }));
          const newsData = newsItems.map(item => {
            const { title, pubDate, description } = item;
            return {
              image: description
                .match('src="(.*?)"')[0]
                .slice(4)
                .replace(/"/g, ''),
              title,
              pubDate,
              description
            };
          });
          resolve(newsData);
        });
      });
    });

    const videosPromise = new Promise((resolve, reject) => {
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
        resolve(videoData);
      });
    });

    const matchDataPromise = new Promise((resolve, reject) => {
      APIService.getConfigurationData(config => {
        const { CurrentCompID, UpcomingCompID, Servarlink, upcoming } = config;
        let compId = CurrentCompID;
        if (!isNullOrEmpty(upcoming)) {
          compId = UpcomingCompID;
        }
        const compUrl = Servarlink + compId + '/Competition.json';
        APIService.getCompData(compUrl, compData => {
          resolve({
            matchData: compData,
            liveMatchData: translateArrayToJSON(compData.LtFixtures).filter(
              fixture => fixture['KKRFlag'] === '1'
            )[0]
          });
        });
      });
    });

    Promise.all([newsPromise, videosPromise, matchDataPromise]).then(data => {
      this.props.setNewsData(data[0]);
      this.props.setVideoData(data[1]);
      this.props.setLiveMatchData(data[2].liveMatchData);
      this.setState({ spinner: false, refreshing: false });
    });
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: 'white' }} />
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true }, () => this._fetchData());
  }

  _renderLiveMatchCard() {
    const {
      starttimeGMT,
      status,
      teamaRR,
      teamawkts,
      teamaRuns,
      teamaovers,
      teamatotalovers,
      teamaimage,
      teambRR,
      teambwkts,
      teambRuns,
      teambovers,
      teambtotalovers,
      teambimage
    } = this.props.liveMatchData;
    
  }

  render() {
    return (
      <Container>
        <Header title={HOME} />
        <Content
          style={commonStyles.content}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
        >
          {this._renderLiveMatchCard()}
          <View>
            <VideoCoverList
              data={this.props.videos.slice(0, 10)}
              horizontal={true}
              onItemPress={videoId => {
                YouTubeStandaloneIOS.playVideo(videoId)
                  .then(() => console.log('Standalone Player Exited'))
                  .catch(errorMessage => console.error(errorMessage));
              }}
            />
            <Text style={{ margin: 10, fontWeight: '500', color: 'white' }}>
              Top Stories
            </Text>
            <NewsCoverList
              data={this.props.news.slice(0, 10)}
              onItemPress={description => {
                this.props.navigation.navigate(VIEW_HOME_NEWS_VIEW, {
                  description
                });
              }}
              horizontal={false}
            />
          </View>
          {this._renderSpinner()}
        </Content>
        <Footer activeButton={VIEW_HOME} {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news,
  videos: state.videos,
  liveMatchData: state.liveMatchData
});

export default connect(
  mapStateToProps,
  Actions
)(Home);

const styles = StyleSheet.create({});
