import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { VIEW_MATCHES } from '../constants/viewNames';
import { MATCHES } from '../constants/strings';

class Matches extends React.Component {
  render() {
    return (
      <Container>
        <Header title={MATCHES} />
        <Content>
          <View />
        </Content>
        <Footer activeButton={VIEW_MATCHES} {...this.props} />
      </Container>
    );
  }
}

export default Matches;

const styles = StyleSheet.create({});
