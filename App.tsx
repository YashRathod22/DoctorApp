/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import StackNavigation from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import store from './src/store/store';

function App() {


  return (
    <Provider store={store}>

      <NavigationContainer>
        {/* <DrawerNavigation /> */}
        <StackNavigation />
      </NavigationContainer>
    </Provider>

  );
}



export default App;
