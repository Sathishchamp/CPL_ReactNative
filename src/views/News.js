import React from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Footer from '../components/Footer';
import { VIEW_NEWS, VIEW_NEWS_NEWS_VIEW } from '../constants/viewNames';
import { NEWS } from '../constants/strings';
import NewsCoverList from '../components/NewsCoverList';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import APIService from '../services/APIService';
import XMLParser from 'react-native-xml2js';
import commonStyles from '../commons/styles';
import BannerHeader, {
  NAV_BAR_HEIGHT,
  CONTENT_MARGIN_TOP
} from '../components/BannerHeader';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  _fetchData() {
    APIService.getNewsFeed(xmlData => {
      XMLParser.parseString(xmlData, (err, jsonData) => {
        let newsItems = jsonData.rss.channel[0].item;
        newsItems = newsItems.map(item => ({
          title: item.title[0],
          pubDate: item.pubDate[0],
          description: item.description[0]
        }));
        this._createNewsData(newsItems);
      });
    });
  }

  _createNewsData(newsItems) {
    //title, pubDate, image, description
    let image = newsItems[0];
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
    this.props.setNewsData(newsData);
    this.setState({ refreshing: false });
  }

  _onRefresh() {
    this.setState({ refreshing: true }, () => this._fetchData());
  }

  render() {
    return (
      <Container>
        <BannerHeader title={NEWS} />
        <Content
          style={[commonStyles.content, { marginTop: CONTENT_MARGIN_TOP }]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
        >
          <NewsCoverList
            data={this.props.news}
            onItemPress={description => {
              this.props.navigation.navigate(VIEW_NEWS_NEWS_VIEW, {
                description
              });
            }}
            horizontal={false}
          />
        </Content>
        <Footer activeButton={VIEW_NEWS} {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news
});

export default connect(
  mapStateToProps,
  Actions
)(News);

const styles = StyleSheet.create({});
