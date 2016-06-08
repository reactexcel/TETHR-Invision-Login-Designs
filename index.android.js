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
import {SignupPage} from './app/pages/signup';
import {ProductPage} from './app/pages/product'

let _navigator = false;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator && _navigator.getCurrentRoutes().length > 1){
     _navigator.pop();
     return true;
  }
   return false;
});

// var NavigationBarRouteMapper = { 
//   LeftButton: function( route, navigator, index, navState ){
//     if(route.id === 'signup'){
//       return(
//           <Text>Bck</Text> 
//       )
//     }
//   },
//   Title: function( route, navigator, index, navState ){
//     if(route.id === 'signup'){
//       return(
//           <Text>Sign Up</Text> 
//       )
//     }
//   },
//   RightButton: function( route, navigator, index, navState ){
//     return null
//   }
// }

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
        <SignupPage navigator={navigator} /> 
      )
    }else if(route.id === 'product'){
      return (
        <ProductPage navigator={navigator} />
      )
    }
  }
  render() {
   return (
      <Navigator
        initialRoute={{id:'product'}}
        configureScene={ (route, routeStack) => {
          if(route.id === 'product'){
            return false;
          }else{
            return Navigator.SceneConfigs.HorizontalSwipeJump
          }
        } }
        renderScene={this._renderScene}>
      </Navigator>
   )
  }
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('tethr', () => tethr);
