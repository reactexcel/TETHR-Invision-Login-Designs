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
  ProgressBarAndroid,
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {LoginManager , GraphRequest , GraphRequestManager} from 'react-native-fbsdk'
import * as _ from 'lodash'

import Icon from 'react-native-vector-icons/MaterialIcons';

import {notify} from '../services/index'

export class LoginPage extends React.Component {
	constructor(props){
		super(props);
    this.state = {
        email: '',
        password: '',
        focus_email: false,
        focus_password: false
      }
    this.googleLogin = this.googleLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this._renderGoogle = this._renderGoogle.bind(this);
    this._renderProgress = this._renderProgress.bind(this);
    this._renderFacebook = this._renderFacebook.bind(this);
    
	}
  componentWillReceiveProps(props){
    
  }
  onLogin(){
      let email = this.state.email;
      let password = this.state.password;
      this.props.onLogin(email,password).then( 
        (data) => {
         this.props.navigator.replace({id: 'landing'})
        },(error) => {
         notify(error);
      })
  }
  googleLogin(){
     let self = this;
     let promise = new Promise( (resolve,reject) => {
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
              // play services are available. can now configure library
              GoogleSignin.configure({
              })
              .then(() => {
                  // you can now call currentUserAsync()
                  console.log('here');
                  GoogleSignin.currentUserAsync().then((user) => {
                    console.log('USER', user);
                    if(user){
                      resolve(user);
                    }else{
                        console.log('user not found');
                        GoogleSignin.signIn()
                          .then((user) => {
                            console.log(user);
                            resolve(user);
                          })
                          .catch((err) => {
                            reject(err);
                          })
                          .done();
                    }
                  }).catch(()=>{
                    reject('Could Not Get Current User')
                  }).done();
              }).catch( () => {
                reject('Configure Failed')
              });
          }).catch(() => {
            reject(new Error('Google Play Services Not Configured'))
          })
    })
    promise.then( (user) => {
      console.log(user);
      let firstname = _.head(_.words(user.name));
      let lastname = _.last(_.words(user.name))
      self.props.onSocialLogin(user.email,user.id,'google',firstname,lastname,user.photo).then( () => {
        self.props.navigator.replace({id: 'landing'})
      }, (error) => {
          notify(error);
        })
        }, (error) => {
          notify(error);
        })
  }
  facebookLogin(){
      let self = this;
      
      LoginManager.logInWithReadPermissions(['public_profile','email']).then(
        function(result) {
          if (result.isCancelled) {
            notify('Login cancelled');
          } else {
           


            // Create a graph request asking for user information with a callback to handle the response.
            const infoRequest = new GraphRequest(
              '/me',
              { parameters: { fields: { string: 'email,name,first_name,last_name' } } },
              (error, user) => {
                  if (error) {
                    notify('Error fetching data: ' + error.toString());
                    console.error(error);
                  } else {
                    console.log(user)
                    let picture = 'http://graph.facebook.com/'+user.id+'/picture?type=large'
                    self.props.onSocialLogin(user.email,user.id,'facebook',user.first_name,user.last_name,picture).then( () => {
                      self.props.navigator.replace({id: 'landing'})
                    }, (error) => {
                      console.log(error);
                      notify(error);
                    })
                  }
                }
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();

          }
        },
        function(error) {
          notify('Login fail with error: ' + error);
        }
      );
  }
  _renderProgress(){
    
      return (
        <ActivityIndicator style={styles.container} animating={this.props.ui.login_page.loading} size="large" />
      )
    
  }
  _renderFacebook(){
    var {height, width} = Dimensions.get('window');
    if(!this.props.ui.login_page.loading){
      return (
        <TouchableOpacity onPress={this.facebookLogin} background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.rounded_blue}>
            <View style={[styles.align_text,{width: width * .75}]}>
              <Text style={styles.facebook_text}>LOGIN VIA FACEBOOK</Text>
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
    if(!this.props.ui.login_page.loading){
      return (
        <TouchableOpacity onPress={this.googleLogin} background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.rounded_blue}>
            <View style={[styles.align_text_red,{width: width * .75}]}>
              <Text style={styles.google_text}>LOGIN VIA GOOGLE</Text>
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
      if(this.props.login_user && this.props.login_user.login_data && this.props.login_user.login_data.name){
          notify('Welcome ' + this.props.login_user.login_data.name);
      }
	    return (
          <View style={{flex: 1}}>
              <Icon.ToolbarAndroid
                onIconClicked={  (pos) => {

                      this.props.navigator.pop();
                    
                }}
                navIconName="arrow-back"
                title={"Login"}
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
                        onSubmitEditing={ () => { 
                           this.onLogin()
                        }} 
                        value={this.state.password}>
                        </TextInput>
                      </View>
                      {this._renderProgress()}
                      {this._renderFacebook()}
                      {this._renderGoogle()}

                      <TouchableOpacity style={{paddingTop: 10}} onPress={ () => {  this.props.navigator.push({id: 'signup'})  } } background={TouchableNativeFeedback.SelectableBackground()}>
                        <View>
                          <Text style={{textDecorationLine:'underline'}}>Don't Have An Account Yet? SIGN UP!</Text>
                        </View>
                      </TouchableOpacity>

              </View>
              <View style={styles.container_end}>
                  <TouchableOpacity style={styles.green_background} onPress={this.onLogin} background={TouchableNativeFeedback.SelectableBackground()}>
                    <View >
                      
                        <Icon color="white" style={{alignSelf: 'center'}} name="navigate-next" size={30}></Icon>
                      
                    </View>
                  </TouchableOpacity>
              </View>
            </View>
	    )
  }
}

LoginPage.propTypes = {
  navigator: React.PropTypes.any.isRequired,
  login_user: React.PropTypes.any.isRequired,
  ui: React.PropTypes.any.isRequired,
  onLogin: React.PropTypes.any.isRequired
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
