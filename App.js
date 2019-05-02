import React, { Component } from 'react';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './src/reducers';
import MainNavigator from './src/navigators/MainNavigator';

console.disableYellowBox = true;

class App extends Component {
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
