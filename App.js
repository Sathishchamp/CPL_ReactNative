import React, { Component } from 'react';
import { AsyncStorage, Alert, NetInfo } from 'react-native';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './src/reducers';
import MainNavigator from './src/navigators/MainNavigator';
import firebase from 'react-native-firebase';

console.disableYellowBox = true;

class App extends Component {
  async componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectionChange
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      // this.props.setNetworkConnStatus(isConnected);
    });

    this.checkPermission();
    this.createNotificationListeners();
  }

  _handleConnectionChange(isConnected) {
    // this.props.setNetworkConnStatus(isConnected);
    if (!isConnected) {
      Alert.alert('No Internet!', 'Please connect to the internet.');
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    );

    this.notificationListener();
    this.notificationOpenedListener();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  render() {
    return (
      <Provider store={createStore(Reducers)}>
        <Root>
          <MainNavigator />
        </Root>
      </Provider>
    );
  }
}

export default App;
