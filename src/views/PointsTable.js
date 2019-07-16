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
import { connect } from 'react-redux';
import commonStyles from '../commons/styles';

class PointsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
    };
  }

  componentDidMount() {
    console.log(this.props.pointsTable)
  }

  render() {
    return (
      <Container>
        <Content style={commonStyles.content}>
          <View>
            
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pointsTable: state.pointsTable
});

export default connect(mapStateToProps)(PointsTable);
