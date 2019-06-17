import React from 'react';
import { View, StyleSheet, RefreshControl, Platform, Text } from 'react-native';
import { Container, Content } from 'native-base';
import Footer from '../components/Footer';
import {
  VIEW_HOME,
  VIEW_HOME_NEWS_VIEW,
  VIEW_MATCH_CENTER,
  VIEW_NAV_NEWS,
  VIEW_NAV_VIDEOS
} from '../constants/viewNames';
import NewsCoverList from '../components/NewsCoverList';
import APIService from '../services/APIService';
import XMLParser from 'react-native-xml2js';
import VideoCoverList from '../components/VideoCoverList';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { isNullOrEmpty, isEqual } from '../utils';
import Spinner from 'react-native-loading-spinner-overlay';
import { YouTubeStandaloneIOS } from 'react-native-youtube';
import commonStyles from '../commons/styles';
import { translateArrayToJSON } from '../utils/CompDataParser';
import LiveMatchCard from '../components/LiveMatchCard';
import AdBanner from '../ads/Banner';
import { STATUS_LIVE } from '../constants/matchStatus';
import {
  BG_KNIGHT_RIDERS,
  BG_TALLAWAHS,
  BG_AMAZON_WARRIORS,
  BG_STARS,
  BG_PATRIOTS,
  BG_TRIDENTS,
  TITLE_BG_COLOR,
  HOME_BG_COLOR
} from '../config/colors';
import { SQUARE721 } from '../constants/fonts';
import BannerHeader, { NAV_BAR_HEIGHT } from '../components/BannerHeader';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      refreshing: false,
      displayLiveCard: false,
      matchState: ''
    };
    this._interval = null;
  }

  componentDidMount() {
    const { news, videos, liveMatchData } = this.props;
    if (isNullOrEmpty(news) || isNullOrEmpty(videos)) {
      this.setState({ spinner: true }, () => {
        this._fetchData();
      });
    }
    if (!isNullOrEmpty(liveMatchData)) {
      this.setState({ displayLiveCard: true });
    }
  }

  _fetchData() {
    if (!isNullOrEmpty(this._interval)) {
      clearInterval(this._interval);
    }

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
        console.log(config);
        let compId = CurrentCompID;
        if (!isNullOrEmpty(upcoming) && upcoming.includes('home')) {
          compId = UpcomingCompID;
        }
        //if team present, set in redux state
        if (!isNullOrEmpty(upcoming) && upcoming.includes('team')) {
          this.props.setPlayerProfileUrl(
            Servarlink + UpcomingCompID + '/PlayerProfile'
          );
        }
        const competitionUrl = Servarlink + compId;
        this.props.setCompetitionId(compId);
        APIService.getCompData(
          competitionUrl + '/Competition.json',
          compData => {
            resolve({
              matchData: compData,
              liveMatchData: translateArrayToJSON(compData.LtFixtures).filter(
                fixture => isEqual(fixture['KKRFlag'], '1')
              )[0],
              competitionUrl,
              teams: translateArrayToJSON(compData.LtTeam)
            });
          }
        );
      });
    });

    Promise.all([newsPromise, videosPromise, matchDataPromise]).then(data => {
      this.props.setNewsData(data[0]);
      this.props.setVideoData(data[1]);
      this.props.setLiveMatchData(data[2].liveMatchData);
      this.props.setCompetitionUrl(data[2].competitionUrl);
      //add backgroud color to team image
      const teams = data[2].teams.map(team => {
        let backgroundColor = '';
        switch (team.ID) {
          case '58':
            backgroundColor = BG_KNIGHT_RIDERS;
            break;
          case '90':
            backgroundColor = BG_TALLAWAHS;
            break;
          case '92':
            backgroundColor = BG_AMAZON_WARRIORS;
            break;
          case '94':
            backgroundColor = BG_TRIDENTS;
            break;
          case '264':
            backgroundColor = BG_STARS;
            break;
          case '349':
            backgroundColor = BG_PATRIOTS;
            break;
          default:
            backgroundColor = BG_KNIGHT_RIDERS;
            break;
        }
        return {
          ...team,
          backgroundColor
        };
      });
      this.props.setTeams(teams);

      console.log(data[2].teams);
      this.setState(
        {
          spinner: false,
          refreshing: false,
          displayLiveCard: true,
          matchState: data[2].liveMatchData.state
        },
        this._initiateInterval
      );
    });
  }

  _initiateInterval = () => {
    if (isEqual(this.props.liveMatchData.state, STATUS_LIVE)) {
      this._interval = setInterval(() => {
        console.log('refreshing live data');
        APIService.getCompData(
          this.props.competitionUrl + '/Competition.json',
          compData => {
            const liveMatchData = translateArrayToJSON(
              compData.LtFixtures
            ).filter(fixture => isEqual(fixture['KKRFlag'], '1'))[0];
            this.props.setLiveMatchData(liveMatchData);
            console.log('live data refresh complete');
            console.log(liveMatchData);
          }
        );
      }, 20000);
    } else if (!isNullOrEmpty(this._interval)) {
      clearInterval(this._interval);
    }
  };

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: 'white' }} />
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true }, () => this._fetchData());
  }

  _renderLiveMatchCard() {
    const { matchState } = this.state;
    return (
      <LiveMatchCard
        data={this.props.liveMatchData}
        onCardPress={matchId =>
          this.props.navigation.navigate(VIEW_MATCH_CENTER, {
            matchId,
            matchState
          })
        }
      />
    );
  }

  _renderListTitle(title) {
    return (
      <View style={{ backgroundColor: TITLE_BG_COLOR, padding: 4 }}>
        <Text style={styles.listTitleText}>{title}</Text>
      </View>
    );
  }

  render() {
    const { spinner, displayLiveCard } = this.state;
    return (
      <Container>
        <BannerHeader />
        <Content
          style={[
            commonStyles.content,
            { marginTop: NAV_BAR_HEIGHT, backgroundColor: HOME_BG_COLOR }
          ]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
        >
          {!spinner && displayLiveCard && this._renderLiveMatchCard()}
          {!spinner && (
            <View>
              {this._renderListTitle('Videos')}
              <VideoCoverList
                data={this.props.videos.slice(0, 7)}
                horizontal={true}
                onItemPress={videoId => {
                  if (isEqual(Platform.OS, 'ios')) {
                    YouTubeStandaloneIOS.playVideo(videoId)
                      .then(() => console.log('Standalone Player Exited'))
                      .catch(errorMessage => console.log(errorMessage));
                  }
                }}
                showReadMore={true}
                onReadMorePress={() => {
                  this.props.navigation.navigate(VIEW_NAV_VIDEOS);
                }}
              />
              {this._renderListTitle('Top Stories')}

              <NewsCoverList
                data={this.props.news.slice(0, 7)}
                onItemPress={description => {
                  this.props.navigation.navigate(VIEW_HOME_NEWS_VIEW, {
                    description
                  });
                }}
                horizontal={false}
                showReadMore={true}
                onReadMorePress={() => {
                  this.props.navigation.navigate(VIEW_NAV_NEWS);
                }}
              />
            </View>
          )}
          {this._renderSpinner()}
        </Content>
        <AdBanner size='fullBanner' />
        <Footer activeButton={VIEW_HOME} {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news,
  videos: state.videos,
  liveMatchData: state.liveMatchData,
  competitionUrl: state.competitionUrl
});

export default connect(
  mapStateToProps,
  Actions
)(Home);

const styles = StyleSheet.create({
  listTitleText: {
    margin: 10,
    color: 'white',
    fontFamily: SQUARE721
  }
});
