import axios from 'axios';
import { NEWS_URL, VIDEOS_URL, CONFIG_URL } from '../config/server';

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
  }
});
