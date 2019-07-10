import React from 'react';
import { View, StyleSheet, RefreshControl, Platform } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Footer from '../components/Footer';
import { VIEW_VIDEOS, VIEW_VIDEOS_VIDEOS_VIEW } from '../constants/viewNames';
import { VIDEOS } from '../constants/strings';
import VideoCoverList from '../components/VideoCoverList';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { YouTubeStandaloneIOS } from 'react-native-youtube';
import commonStyles from '../commons/styles';
import { isEqual } from '../utils';
import BannerHeader, {
  NAV_BAR_HEIGHT,
  CONTENT_MARGIN_TOP
} from '../components/BannerHeader';

class Podcasts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            audios: []
        };
    }
    componentDidMount(){
        this._fetchPodcasts();
    }
    _fetchPodcasts() {
        
    }
} 