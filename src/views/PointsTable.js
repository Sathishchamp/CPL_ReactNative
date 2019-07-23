import React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import commonStyles from '../commons/styles';
import { SQUARE721, HELVETICA } from '../constants/fonts';
import { TAB_BG, BG_GREY, VIEW_BG_COLOR } from '../config/colors';

class PointsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  componentDidMount() {
    console.log(this.props.pointsTable);
  }

  _renderTableHeaders() {
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.row, styles.titleRow]}>
          <View style={styles.colFlex2}>
            <Text style={styles.titleText}>POS</Text>
          </View>
          <View style={styles.colFlex2}>
            <Text style={styles.titleText}>TEAM</Text>
          </View>
          <View style={styles.colFlex1}>
            <Text style={styles.titleText}>M</Text>
          </View>
          <View style={styles.colFlex1}>
            <Text style={styles.titleText}>W</Text>
          </View>
          <View style={styles.colFlex1}>
            <Text style={styles.titleText}>L</Text>
          </View>
          <View style={[styles.colFlex1]}>
            <Text style={styles.titleText}>NR</Text>
          </View>
          <View style={[styles.colFlex2]}>
            <Text style={styles.titleText}>NRR</Text>
          </View>
          <View style={[styles.colFlex2]}>
            <Text style={styles.titleText}>PTS</Text>
          </View>
        </View>
      </View>
    );
  }

  _renderRow(pos, team, m, w, l, nr, nrr, pts) {
    return (
      <View style={[styles.row, styles.dataRow]}>
        <View style={styles.colFlex2}>
          <Text style={styles.rowText}>{pos}</Text>
        </View>
        <View style={styles.colFlex2}>
          <Image
            source={{ uri: team }}
            style={{ height: 30, width: 30 }}
            resizeMode='contain'
          />
        </View>
        <View style={styles.colFlex1}>
          <Text style={styles.rowText}>{m}</Text>
        </View>
        <View style={styles.colFlex1}>
          <Text style={styles.rowText}>{w}</Text>
        </View>
        <View style={styles.colFlex1}>
          <Text style={styles.rowText}>{l}</Text>
        </View>
        <View style={styles.colFlex1}>
          <Text style={styles.rowText}>{nr}</Text>
        </View>
        <View style={styles.colFlex2}>
          <Text style={styles.rowText}>{nrr}</Text>
        </View>
        <View style={styles.colFlex2}>
          <Text style={styles.rowText}>{pts}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Content style={[commonStyles.content, { backgroundColor: BG_GREY }]}>
          {this._renderTableHeaders()}
          <FlatList
            data={this.props.pointsTable}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) =>
              this._renderRow(
                index + 1,
                item['teamimage'],
                item['mat'],
                item['won'],
                item['lost'],
                item['nr'],
                item['nrr'],
                item['pts']
              )
            }
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pointsTable: state.pointsTable
});

export default connect(mapStateToProps)(PointsTable);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 2
  },
  titleRow: {
    backgroundColor: TAB_BG
  },
  colFlex2: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4
  },
  colFlex1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4
  },
  dataRow: {
    marginTop: 4,
    marginBottom: 4
  },
  titleText: {
    color: 'white',
    fontSize: 11,
    fontFamily: SQUARE721
  },
  rowText: {
    color: VIEW_BG_COLOR,
    fontFamily: HELVETICA,
    fontSize: 13
  }
});
