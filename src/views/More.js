import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { VIEW_MORE } from '../constants/viewNames';
import { MORE } from '../constants/strings';

class More extends React.Component {
  render() {
    return (
      <Container>
        <Header title={MORE} />
        <Content>
          <View />
        </Content>
        <Footer activeButton={VIEW_MORE} {...this.props} />
      </Container>
    );
  }
}

export default More;

const styles = StyleSheet.create({});
