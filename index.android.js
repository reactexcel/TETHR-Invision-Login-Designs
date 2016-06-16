/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid
} from 'react-native';


import {StartPage} from './app/pages/start';
import {HomePage} from './app/pages/home';
import {TourPage} from './app/pages/tour';
import SignupContainer from './app/containers/signup';
import {ProductPage} from './app/pages/product'


import { Provider } from 'react-redux'

import store from './app/store/index'


let _navigator = false;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator && _navigator.getCurrentRoutes().length > 1){
     _navigator.pop();
     return true;
  }
   return false;
});


class tethr extends Component {
  constructor(props){
    super(props);
    this._renderScene = this._renderScene.bind(this);
  }
  _renderScene(route,navigator){
    _navigator = navigator;
    if(route.id === 'start'){
      return (
        <StartPage navigator={navigator} />
      )
    }else if(route.id === 'home'){
      return (
        <HomePage navigator={navigator} />
      )
    }else if(route.id === 'tour'){
      return (
        <TourPage navigator={navigator} />
      )
    }else if(route.id === 'signup'){
      return (
        <SignupContainer navigator={navigator} /> 
      )
    }else if(route.id === 'product'){
      return (
        <ProductPage navigator={navigator} />
      )
    }
  }
  render() {
   return (
     <Provider store={store}>
      <Navigator
        initialRoute={{id:'signup'}}
        configureScene={ (route, routeStack) => {
          if(route.id === 'product'){
            return false;
          }else{
            return Navigator.SceneConfigs.HorizontalSwipeJump
          }
        } }
        renderScene={this._renderScene}>
      </Navigator>
    </Provider>
   )
  }
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('tethr', () => tethr);
