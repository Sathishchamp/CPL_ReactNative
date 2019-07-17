import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Container, Content } from 'native-base';
import commonStyles from '../commons/styles';
import Spinner from 'react-native-loading-spinner-overlay';

class Fixtures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
    };
  }

  componentDidMount() {}

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: 'white' }} />
    );
  }

  render() {
    return (
      <Container>
        <Content style={commonStyles.content}>
          <View />
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

export default Fixtures;
