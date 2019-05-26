import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { VIEW_TEAMS, VIEW_TEAM_PLAYERS } from '../constants/viewNames';
import { MATCHES, TEAMS } from '../constants/strings';
import commonStyles from '../commons/styles';
import TeamCard from '../components/TeamCard';
import { connect } from 'react-redux';

class Matches extends React.Component {
  render() {
    return (
      <Container>
        <Header title={TEAMS} />
        <Content padder style={commonStyles.content}>
          <FlatList
            data={this.props.teams}
            numColumns={2}
            renderItem={({ item }) => (
              <TeamCard
                data={item}
                onPress={teamId =>
                  this.props.navigation.navigate(VIEW_TEAM_PLAYERS, {
                    teamId
                  })
                }
                backgroundColor={item.backgroundColor}
              />
            )}
          />
        </Content>
        <Footer activeButton={VIEW_TEAMS} {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams
});

export default connect(mapStateToProps)(Matches);

const styles = StyleSheet.create({});
