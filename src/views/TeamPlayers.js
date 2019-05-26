import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import commonStyles from '../commons/styles';

class TeamPlayers extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content padder style={commonStyles.content}>
          <View />
        </Content>
      </Container>
    );
  }
}

export default TeamPlayers;
