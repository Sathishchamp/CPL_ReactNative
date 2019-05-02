import React from 'react';
import { View, StyleSheet } from 'react-native';
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  componentDidMount() {
    if (isNullOrEmpty(this.props.news)) {
      this.setState({ spinner: true }, () => {
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
      });
    }
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
    this.setState({ spinner: false });
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: 'white' }} />
    );
  }

  render() {
    return (
      <Container>
        <Header title={HOME} />
        <Content>
          <View>
            <NewsCoverList
              data={this.props.news.slice(0, 5)}
              onItemPress={description => {
                this.props.navigation.navigate(VIEW_HOME_NEWS_VIEW, {
                  description
                });
              }}
              horizontal={true}
            />
            <Text style={{ margin: 10, fontWeight: '500' }}>Top Stories</Text>
            <VideoCoverList
              data={this.state.news}
              onItemPress={id => alert(id)}
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
  news: state.news
});

export default connect(
  mapStateToProps,
  Actions
)(Home);

const styles = StyleSheet.create({});
