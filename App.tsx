/**
 * UPayments React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux'

import MainNavigation from './navigation/MainNavigation';
import ErrorBoundary from './components/ErrorBoundary';

import { store } from './store'


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ErrorBoundary>
      <RootSiblingParent>
        <Provider store={store}>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <MainNavigation />
          </SafeAreaView>
        </Provider>
      </RootSiblingParent>
    </ErrorBoundary>
  );
};

export default App;
