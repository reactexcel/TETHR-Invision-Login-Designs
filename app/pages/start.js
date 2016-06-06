import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  Dimensions
} from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons';


export class StartPage extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
	    var {height, width} = Dimensions.get('window');
	    return (
	      <View style={styles.container}>
	        <TouchableNativeFeedback onPress={ () => {    }} background={TouchableNativeFeedback.SelectableBackground()}>
	          <View style={styles.signup_feedback}>
	            <Text style={styles.signup}>
	              SIGN UP
	            </Text>
	          </View>
	        </TouchableNativeFeedback>
	        <View style={styles.logo}>
	          <Image style={{width: 100,height:100}} source={require('./../../images/splash-logo.png')}></Image>
	        </View>
	        <View style={styles.next,{  height: height*.2  }}>
	          <TouchableNativeFeedback onPress={ () => {  this.props.navigator.push({id: 'home'})  }} background={TouchableNativeFeedback.SelectableBackground()}>
	            <View style={{padding: 10}}>
	              <Icon iconStyle={{textAlign: 'center'}} onPress={ () => {}} color={'#333'} backgroundColor={'#f3f3f3'} size={30} name="arrow-forward"></Icon>
	            </View>
	          </TouchableNativeFeedback>
	        </View>
	      </View>
	    );
  }
}

StartPage.propTypes = {
  navigator: React.PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    flexDirection: 'column'
  },
  signup_feedback: {
    alignSelf: 'flex-end',    
    borderRadius: 5
  },
  signup: {
    fontSize: 15,
    textAlign: 'right',
    margin: 10,
    color: '#333'
  },
  logo: {
  },
  next: {
    alignSelf: 'center',
    alignItems: 'flex-start'
  }
});