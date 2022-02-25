import React, {Node} from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import Router from './src/navigation/Router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';

const App: () => Node = () => {
  // Update the following API_URL according to your environment
  global.API_URL = 'http://192.168.0.12:10005';
  // global.API_URL = 'http://192.168.0.100:10005';
  // global.API_URL = 'http://192.168.0.12:10005';
  // global.API_URL = 'http://192.168.1.6:10005';
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <Router />
      </PersistGate>
    </Provider>
  );
};

/*
  Commented by Angeline
  Date: Friday February 4, 2022
  Note: Run the commands below to download some external libraries
        npm install @react-navigation/native
        npm install @react-navigation/bottom-tabs
        npm install @react-navigation/stack
        npm install react-native-reanimated react-native-gesture-handler@2.1.1 react-native-screens react-native-safe-area-context @react-native-community/masked-view
*/
export default App;
