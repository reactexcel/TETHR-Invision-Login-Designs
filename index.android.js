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
  BackAndroid,
  AsyncStorage
} from 'react-native';

require('react-native');
// delete GLOBAL.XMLHttpRequest;

import PushNotification from 'react-native-push-notification'


import StartContainer from './app/containers/start';
import {HomePage} from './app/pages/home';
import TourContainer from './app/containers/tour';
import SignupContainer from './app/containers/signup';
import {ProductPage} from './app/pages/product'
import LandingContainer from './app/containers/landing'
import LoginContainer from './app/containers/login'
import CategoryContainer from './app/containers/category'

import BaseStyle from './app/styles/base'

import { Provider } from 'react-redux'

import store from './app/store/index'
import * as actions from './app/actions/index'

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
    
    let state = store.getState().toJS();
    
    this.state = {
      initRoute : {
        id: 'start'
      }
    }
    
  }
  componentWillMount(){
    PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
            console.log( 'TOKEN:', token );
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );

            //need to dispatch action here to integrate with redux
        },

        // ANDROID ONLY: (optional) GCM Sender ID.
        senderID: "337799473499",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
          * IOS ONLY: (optional) default: true
          * - Specified if permissions will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });
  }
  _renderScene(route,navigator){
    _navigator = navigator;
    if(route.id === 'start'){
      return (
        <StartContainer baseStyle={BaseStyle} navigator={navigator} />
      )
    }else if(route.id === 'home'){
      return (
        <HomePage baseStyle={BaseStyle} navigator={navigator} />
      )
    }else if(route.id === 'tour'){
      return (
        <TourContainer baseStyle={BaseStyle} navigator={navigator} />
      )
    }else if(route.id === 'signup'){
      return (
        <SignupContainer baseStyle={BaseStyle} navigator={navigator} /> 
      )
    }else if(route.id === 'product'){
      return (
        <ProductPage baseStyle={BaseStyle} navigator={navigator} />
      )
    }else if(route.id === 'landing'){
      return (
        <LandingContainer baseStyle={BaseStyle} navigator={navigator} />
      )
    }else if(route.id === 'login'){
      return (
        <LoginContainer baseStyle={BaseStyle} navigator={navigator} />
      )
    }else if(route.id === 'category'){
      return (
        <CategoryContainer navigator={navigator} {...route.passProps} />
      )
    }
  }
  render() {
   return (
     <Provider store={store}>
      <Navigator
        initialRoute={this.state.initRoute}
      
        renderScene={this._renderScene}>
      </Navigator>
    </Provider>
   )
  }
}

const styles = StyleSheet.create({
  
});



store.subscribe(()=>{
   let state = store.getState().toJS();
   if(state.login && state.login.login_data && state.login.login_data.id){
     console.log('to local storage');
     console.log(state.login.login_data);
     AsyncStorage.setItem('login',JSON.stringify(state.login.login_data));
   }
  
})

AsyncStorage.getItem('login', (err,login) => {
  console.log('from local storage');
  console.log(login);
  store.dispatch(actions.loginTodoSuccess(JSON.parse(login)));
});

AppRegistry.registerComponent('tethr', () => tethr);
