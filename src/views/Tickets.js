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
import commonStyles from '../commons/styles';
import {SUPPORT_JSON} from '../constants/strings.js';
import { isNullOrEmpty } from '../utils'; 
const SCREEN_H = Dimensions.get('screen').height;

class Tickets extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            loading : false
        };
    }
    componentDidMount() {
        this._fetchData();
    }
    _fetchData() {
        const url = this.props.competitionUrl;
        if(!isNullOrEmpty(url)){
            const link = url + currentCompetitionId + `/`+ SUPPORT_JSON;
            console.log(link)
            this.setState({loading:true},() => 
            APIService.getTickets(
                url + currentCompetitionId + `/`+ SUPPORT_JSON,
                data => {
                    console.log(data)
                }
            ))
        }
    }

    render(){
        return (
            <Container>
                <Content style={commonStyles.content}>
                <View style={{ flex: 1, height: SCREEN_H }}>
                    <WebView
                        originWhitelist={['*']}
                       // source={{ html: this.state.description }}
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
export default connect(mapStateToProps)(Tickets)







