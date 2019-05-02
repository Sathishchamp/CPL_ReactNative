import axios from 'axios';
import { NEWS_URL } from '../config/server';

export default (APIService = {
  getNewsFeed(callback) {
    axios
      .get(NEWS_URL)
      .then(res => {
        callback(res.data);
      })
      .catch(err => console.log(err));
  }
});
