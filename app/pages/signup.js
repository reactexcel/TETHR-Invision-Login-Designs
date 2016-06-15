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
  TextInput
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import Icon from 'react-native-vector-icons/MaterialIcons';

var {width, height} = Dimensions.get('window');


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
	}
  googleLogin(){
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
                this.setState({user: user});
              }else{
                  console.log('user not found');
                  GoogleSignin.signIn()
                    .then((user) => {
                      console.log(user);
                      this.setState({user: user});
                    })
                    .catch((err) => {
                      console.log('WRONG SIGNIN', err);
                    })
                    .done();
              }
            }).done();
        });
    })
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
                      <TouchableOpacity onPress={ () => {  console.log('add')  }} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.rounded_blue}>
                          <View style={[styles.align_text,{width: width * .75}]}>
                            <Text style={styles.facebook_text}>SIGN UP VIA FACEBOOK</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.googleLogin} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.rounded_blue}>
                          <View style={[styles.align_text_red,{width: width * .75}]}>
                            <Text style={styles.google_text}>SIGN UP VIA GOOGLE</Text>
                          </View>
                        </View>
                      </TouchableOpacity>

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
  navigator: React.PropTypes.any.isRequired
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
