import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  WebView
} from 'react-native';
import { Container, Content } from 'native-base';
import APIService from '../services/APIService';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay'
import commonStyles from '../commons/styles';
import {SUPPORT_JSON} from '../constants/strings.js';
import { isNullOrEmpty } from '../utils'; 
import { SPINNER_COLOR } from '../config/colors';
const SCREEN_H = Dimensions.get('screen').height;

class Sponsors extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            loading : false,
            sponsors : ""
        };
    }
    componentDidMount() {
        this._fetchData();
    }
    _fetchData() {
        const url = this.props.serverUrl;
        if(!isNullOrEmpty(url)){
            const link = url + this.props.currentCompetitionId + SUPPORT_JSON;
            console.log(link)
            this.setState({loading:true},() => 
            APIService.getSponsors(
                link,
                data => {
                    console.log(data.Tickets)
                    this.setState({loading:false,sponsors:data.SPONSORS})
                }
            ))
        }
    }
    _renderSpinner() {
        return (
            <Spinner visible={this.state.spinner} color={SPINNER_COLOR} />
        );
      }
    render(){
        return (
            <Container>
                <Content style={commonStyles.content}>
                {this._renderSpinner()}
                <View style={{ flex: 1, height: SCREEN_H }}>
                    <WebView
                        originWhitelist={['*']}
                        source={{ uri: this.state.sponsors }}
                        style={{ flex: 1}}
                    // scalesPageToFit={true}
                    />
                </View>
                </Content>
            </Container>
        )
            
    }
}
const mapStateToProps = state => ({
    currentCompetitionId: state.currentCompetitionId,
    upcomingCompetitionId: state.upcomingCompetitionId,
    serverUrl: state.serverUrl
});
export default connect(mapStateToProps)(Sponsors)