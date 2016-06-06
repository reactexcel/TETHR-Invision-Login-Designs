/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


import {StartPage} from './app/pages/start';




class tethr extends Component {
  render() {
   return (
      <StartPage/>
   )
  }
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('tethr', () => tethr);
