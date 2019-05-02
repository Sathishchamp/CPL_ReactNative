import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { VIEW_NEWS, VIEW_NEWS_NEWS_VIEW } from '../constants/viewNames';
import { NEWS } from '../constants/strings';
import NewsCoverList from '../components/NewsCoverList';
import { connect } from 'react-redux';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header title={NEWS} />
        <Content>
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

export default connect(mapStateToProps)(News);

const styles = StyleSheet.create({});
