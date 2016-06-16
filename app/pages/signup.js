import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
  ToolbarAndroid,
  TextInput,
  ProgressBarAndroid
} from 'react-native';
import { connect } from 'react-redux';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import Icon from 'react-native-vector-icons/MaterialIcons';

export class SignupPage extends React.Component {
	constructor(props){
		super(props);
    this.state = {
        name : '',
        email: '',
        password: '',
        focus_email: false,
        focus_password: false
      }
    this.googleLogin = this.googleLogin.bind(this);
    this._renderGoogle = this._renderGoogle.bind(this);
    this._renderProgress = this._renderProgress.bind(this);
    this._renderFacebook = this._renderFacebook.bind(this);
	}
  googleLogin(){
     this.props.googleSignup()
  }
  _renderProgress(){
    if(this.props.login_user.login_request){
      return (
        <View style={styles.container}>
             <ProgressBarAndroid styleAttr="Inverse" />
        </View>
      )
    }else{
      return null
    }
  }
  _renderFacebook(){
    var {height, width} = Dimensions.get('window');
    if(!this.props.login_user.login_request){
      return (
        <TouchableOpacity onPress={ () => {  console.log('add')  }} background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.rounded_blue}>
            <View style={[styles.align_text,{width: width * .75}]}>
              <Text style={styles.facebook_text}>SIGN UP VIA FACEBOOK</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }else{
      return null
    }
  }
  _renderGoogle(){
    var {height, width} = Dimensions.get('window');
    if(!this.props.login_user.login_request){
      return (
        <TouchableOpacity onPress={this.googleLogin} background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.rounded_blue}>
            <View style={[styles.align_text_red,{width: width * .75}]}>
              <Text style={styles.google_text}>SIGN UP VIA GOOGLE</Text>
            </View>
          </View>
        </TouchableOpacity> 
      )
    }else{
      return null
    }
  }
	render() {
      var {height, width} = Dimensions.get('window');
	    return (
          <View style={{flex: 1}}>
              <Icon.ToolbarAndroid
                onIconClicked={  (pos) => {

                      this.props.navigator.pop();
                    
                }}
                navIconName="arrow-back"
                title={"Sign Up"}
                style={styles.toolbar}
                titleColor={"#333"}
                action={[]}>
              </Icon.ToolbarAndroid>
                  <View style={[styles.container,{width: width * .95, paddingLeft: width * .05}]}>

                      <View style={styles.logo}>
                          <Image style={{width: 100,height:100}} source={require('./../../images/splash-logo.png')}></Image>
                      </View>
                      <View style={styles.textwrapper}>
                        <TextInput
                        autoCapitalize="words"
                        returnKeyType={"next"}
                        placeholder={"Name"}
                        style={styles.textfield}
                        onChangeText={(text) => this.setState({
                            name: text
                        })}
                        onSubmitEditing={ () => { 
                           this.refs['email'].focus()
                        }}  
                        value={this.state.name}>
                        </TextInput>
                      </View>
                      <View style={styles.textwrapper}>
                        <TextInput
                        ref="email"
                        returnKeyType={"next"}
                        keyboardType={"email-address"}
                        placeholder={"Email"}
                        style={{height: 40, borderColor: '#f3f3f3', borderWidth: StyleSheet.hairlineWidth}}
                        onChangeText={(text) => this.setState({
                            email: text
                        })}
                        onSubmitEditing={ () => { 
                           this.refs['pass'].focus()
                        }} 
                        value={this.state.email}>
                        </TextInput>
                      </View>
                      <View style={styles.textwrapper}>
                        <TextInput
                        ref="pass"
                        returnKeyType={"go"}
                        secureTextEntry={true}
                        placeholder={"Password"}
                        style={{height: 40, borderColor: '#f3f3f3', borderWidth: StyleSheet.hairlineWidth}}
                        onChangeText={(text) => this.setState({
                            password: text
                        })}
                        value={this.state.password}>
                        </TextInput>
                      </View>
                      {this._renderProgress()}
                      {this._renderFacebook()}
                      {this._renderGoogle()}

              </View>
              <View style={styles.container_end}>
                  <TouchableOpacity style={styles.green_background} onPress={ () => {  console.log('add')  }} background={TouchableNativeFeedback.SelectableBackground()}>
                    <View >
                      
                        <Icon color="white" style={{alignSelf: 'center'}} name="navigate-next" size={30}></Icon>
                      
                    </View>
                  </TouchableOpacity>
              </View>
            </View>
	    )
  }
}

SignupPage.propTypes = {
  navigator: React.PropTypes.any.isRequired,
  googleSignup : React.PropTypes.func.isRequired,
  login_user: React.PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: .8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
   toolbar: {
    height: 56,
  },
  logo : {
    alignItems: 'center'
  },
  textwrapper: {
    height: 80
  },
  textfield: {
    height: 40, 
    borderColor: '#f3f3f3', 
    borderWidth: StyleSheet.hairlineWidth
  },
  rounded_blue :{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 5
  },
  align_text: {
    padding: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#4b77da',
    borderRadius: 30
  },
  align_text_red: {
    padding: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#dd4b39',
    borderRadius: 30
  },
  facebook_text : {
    fontSize: 15,
    textAlign: 'center',
    color: '#4b77da'
  },
  google_text : {
    fontSize: 15,
    textAlign: 'center',
    color: '#dd4b39'
  },
  container_end: {
    flex: .2,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent:'center'
  },
  green_background : {
     backgroundColor: '#22c064',
     alignSelf: 'flex-end',
     flex: 1,
     padding: 20
  }
});
