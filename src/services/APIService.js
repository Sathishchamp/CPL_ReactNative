import axios from 'axios';
import {
  NEWS_URL,
  VIDEOS_URL,
  CONFIG_URL,
  SCORES_URL,
  PODCASTS_URL
} from '../config/server';
import { isEqual } from '../utils/index';

export default (APIService = {
  getNewsFeed(callback) {
    axios
      .get(NEWS_URL)
      .then(res => {
        callback(null, res.data);
      })
      .catch(err => {
        callback(err, null);
        console.log(err);
      });
  },

  getVideosFeed(callback) {
    axios
      .get(VIDEOS_URL)
      .then(res => {
        callback(null, res.data);
      })
      .catch(err => {
        callback(err, null);
        console.log(err);
      });
  },

  getConfigurationData(callback) {
    axios
      .get(CONFIG_URL)
      .then(res => {
        callback(null, res.data);
      })
      .catch(err => {
        callback(err, null);
        console.log(err);
      });
  },

  getCompData(url, callback) {
    axios
      .get(url)
      .then(res => {
        callback(null, res.data);
      })
      .catch(err => {
        callback(err, null);
        console.log(err);
      });
  },

  getScores(compId, matchId, jsonConfig, callback) {
    let json = '';
    if (isEqual(jsonConfig, 'scores')) {
      json = 'Scores';
    } else if (isEqual(jsonConfig, 'prematch')) {
      json = 'Prematch';
    } else if (isEqual(jsonConfig, 'fullcommentary')) {
      json = 'FullCommentary';
    }
    console.log(
      'final url',
      SCORES_URL + '/' + compId + '/' + matchId + `/${json}.json`
    );
    axios
      .get(SCORES_URL + '/' + compId + '/' + matchId + `/${json}.json`)
      .then(res => callback(res.data))
      .catch(err => console.log(err));
  },

  getTickets(url, callback) {
    axios
      .get(url)
      .then(res => {
        callback(res.data);
      })
      .catch(err => console.log(err));
  },

  getSponsors(url, callback) {
    axios
      .get(url)
      .then(res => {
        callback(res.data);
      })
      .catch(err => console.log(err));
  },

  getPlayerList(url, callback) {
    axios
      .get(url)
      .then(res => {
        callback(null, res.data);
      })
      .catch(err => {
        console.log(err);
        callback(err, null);
      });
  },

  getResults(url, callback) {
    axios
      .get(url)
      .then(res => {
        callback(res.data);
      })
      .catch(err => console.log(err));
  },

  getPodcasts(callback) {
    axios
      .get(PODCASTS_URL)
      .then(res => {
        callback(res.data);
      })
      .catch(err => console.log(err));
  }
});
