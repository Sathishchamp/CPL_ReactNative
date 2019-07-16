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
import {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid
} from 'react-native-youtube';
import commonStyles from '../commons/styles';
import { translateArrayToJSON } from '../utils/CompDataParser';
import LiveMatchCard, {
  MATCH_CARD_WIDTH,
  SCREEN_W
} from '../components/LiveMatchCard';
import AdBanner from '../ads/Banner';
import { STATUS_LIVE, STATUS_YET_TO_BEGIN } from '../constants/matchStatus';
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
import BannerHeader, {
  NAV_BAR_HEIGHT,
  CONTENT_MARGIN_TOP,
  STATUS_BAR_HEIGHT
} from '../components/BannerHeader';
import { YOUTUBE_API_KEY } from '../config/keys';

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
      APIService.getNewsFeed((err, xmlData) => {
        if (err) {
          reject(err);
        } else {
          XMLParser.parseString(xmlData, (err, jsonData) => {
            if (err) {
              reject(err);
            } else {
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
            }
          });
        }
      });
    });

    const videosPromise = new Promise((resolve, reject) => {
      APIService.getVideosFeed((err, playlistData) => {
        if (err) {
          reject(err);
        } else {
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
        }
      });
    });

    const matchDataPromise = new Promise((resolve, reject) => {
      APIService.getConfigurationData((err, config) => {
        if (err) {
          reject(err);
        } else {
          const {
            CurrentCompID,
            UpcomingCompID,
            Servarlink,
            upcoming,
            showFixtures,
            showTickets
          } = config;

          console.log(config);

          if (isEqual(showFixtures, '1')) {
            this.props.setShowFixtures(true);
          }

          if (isEqual(showTickets, '1')) {
            this.props.setShowTickets(true);
          }

          let compId = CurrentCompID;
          if (!isNullOrEmpty(upcoming) && upcoming.includes('home')) {
            compId = UpcomingCompID;
          }

          if (!isNullOrEmpty(upcoming) && upcoming.includes('fixtures')) {
            this.props.setIsFixturesUpcoming(true);
          }

          if (!isNullOrEmpty(upcoming) && upcoming.includes('stats')) {
            this.props.setIsStatsUpcoming(true);
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
            (err, compData) => {
              if (err) {
                reject(err);
              } else {
                const liveMatchData = translateArrayToJSON(compData.LtFixtures);
                const liveMatchIndex = liveMatchData
                  .map(data => data['KKRFlag'])
                  .indexOf('1');
                // liveMatchData.filter(fixture =>
                //   isEqual(fixture['KKRFlag'], '1')
                // );
                resolve({
                  matchData: compData,
                  liveMatchData,
                  liveMatchIndex,
                  competitionUrl,
                  serverUrl: Servarlink,
                  currentCompetitionId: CurrentCompID,
                  upcomingCompetitionId: UpcomingCompID,
                  teams: translateArrayToJSON(compData.LtTeam)
                });
              }
            }
          );
        }
      });
    });

    Promise.all([newsPromise, videosPromise, matchDataPromise])
      .then(data => {
        const {
          liveMatchData,
          liveMatchIndex,
          competitionUrl,
          serverUrl,
          currentCompetitionId,
          upcomingCompetitionId
        } = data[2];
        this.props.setNewsData(data[0]);
        this.props.setVideoData(data[1]);
        this.props.setLiveMatchData(liveMatchData);
        this.props.setLiveMatchCardIndex(liveMatchIndex);
        this.props.setCompetitionUrl(competitionUrl);
        this.props.setServerUrl(serverUrl);
        this.props.setCurrentCompetitionId(currentCompetitionId);
        this.props.setUpcomingCompetitionId(upcomingCompetitionId);
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

        this.setState(
          {
            spinner: false,
            refreshing: false,
            displayLiveCard: true,
            matchState: liveMatchData[liveMatchIndex].state
          },
          this._initiateInterval
        );
      })
      .catch(err => {
        console.log(err);
        this.setState({ spinner: false, refreshing: false }, () =>
          setTimeout(() => {
            Alert.alert('Server Error!', 'Try again later.');
          }, 100)
        );
      });
  }

  _initiateInterval = () => {
    const { liveMatchData, liveMatchIndex } = this.props;
    this.matchCard.scrollToIndex({
      animated: true,
      index: liveMatchIndex
    });
    if (isEqual(liveMatchData[liveMatchIndex].state, STATUS_LIVE)) {
      this._interval = setInterval(() => {
        console.log('refreshing live data');
        APIService.getCompData(
          this.props.competitionUrl + '/Competition.json',
          (err, compData) => {
            if (!err) {
              const liveMatchData = translateArrayToJSON(compData.LtFixtures);
              this.props.setLiveMatchData(liveMatchData);
              console.log('live data refresh complete');
              console.log(liveMatchData);
            }
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

  _renderLiveMatchCard(item) {
    const { matchState } = this.state;
    return (
      <LiveMatchCard
        data={item}
        showRR={false}
        disableNavigation={isEqual(item.state, STATUS_YET_TO_BEGIN)}
        onCardPress={matchId =>
          this.props.navigation.navigate(VIEW_MATCH_CENTER, {
            matchId,
            matchState
          })
        }
      />
    );
  }

  _renderLiveMatchCardList() {
    const { liveMatchData, liveMatchIndex } = this.props;
    return (
      <FlatList
        getItemLayout={(data, index) => ({
          length: SCREEN_W * 0.98,
          offset: SCREEN_W * index,
          index
        })}
        data={liveMatchData}
        extraData={this.props}
        renderItem={({ item }) => this._renderLiveMatchCard(item)}
        keyExtractor={(item, index) => index}
        initialScrollIndex={liveMatchIndex}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={ref => {
          this.matchCard = ref;
        }}
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
            {
              marginTop: NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT,
              backgroundColor: HOME_BG_COLOR
            }
          ]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
        >
          {!spinner && displayLiveCard && this._renderLiveMatchCardList()}
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
                  } else if (isEqual(Platform.OS, 'android')) {
                    YouTubeStandaloneAndroid.playVideo({
                      videoId,
                      apiKey: YOUTUBE_API_KEY
                    })
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
  competitionUrl: state.competitionUrl,
  liveMatchIndex: state.liveMatchIndex
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
