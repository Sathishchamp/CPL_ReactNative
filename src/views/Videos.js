import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { VIEW_VIDEOS } from '../constants/viewNames';
import { VIDEOS } from '../constants/strings';
import VideoCoverList from '../components/VideoCoverList';

class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [
        {
          id: 1,
          image:
            'https://drop.ndtv.com/albums/SPORTS/india_nz/gallery-thumb_640x480.jpg?output-quality=70&output-format=webp&downsize=491:*',
          text: 'CPL Draft to take place on 22 May'
        },
        {
          id: 2,
          image:
            'https://drop.ndtv.com/albums/SPORTS/india_nz/gallery-thumb_640x480.jpg?output-quality=70&output-format=webp&downsize=491:*',
          text: 'CPL Draft to take place on 22 May'
        },
        {
          id: 3,
          image:
            'https://drop.ndtv.com/albums/SPORTS/india_nz/gallery-thumb_640x480.jpg?output-quality=70&output-format=webp&downsize=491:*',
          text: 'CPL Draft to take place on 22 May'
        }
      ]
    };
  }

  render() {
    return (
      <Container>
        <Header title={VIDEOS} />
        <Content>
          <View>
            <VideoCoverList
              data={this.state.news}
              onItemPress={id => alert(id)}
            />
          </View>
        </Content>
        <Footer activeButton={VIEW_VIDEOS} {...this.props} />
      </Container>
    );
  }
}

export default Videos;

const styles = StyleSheet.create({});
