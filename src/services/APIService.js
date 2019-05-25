import axios from 'axios';
import { NEWS_URL, VIDEOS_URL, CONFIG_URL, SCORES_URL } from '../config/server';
import { isEqual } from '../utils/index';

export default (APIService = {
  getNewsFeed(callback) {
    axios
      .get(NEWS_URL)
      .then(res => {
        callback(res.data);
      })
      .catch(err => console.log(err));
  },

  getVideosFeed(callback) {
    axios
      .get(VIDEOS_URL)
      .then(res => {
        callback(res.data);
      })
      .catch(err => console.log(err));
  },

  getConfigurationData(callback) {
    axios
      .get(CONFIG_URL)
      .then(res => {
        callback(res.data);
      })
      .catch(err => console.log(err));
  },

  getCompData(url, callback) {
    axios
      .get(url)
      .then(res => {
        callback(res.data);
      })
      .catch(err => console.log(err));
  },

  getScores(compId, matchId, jsonConfig, callback) {
    let json = '';
    if (isEqual(jsonConfig, 'scores')) {
      json = 'Scores';
    } else if ((jsonConfig, 'prematch')) {
      json = 'Prematch';
    }
    axios
      .get(SCORES_URL + '/' + compId + '/' + matchId + `/${json}.json`)
      .then(res => callback(res.data))
      .catch(err => console.log(err));
  }
});
