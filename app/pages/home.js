import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';


export class HomePage extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
	    var {height, width} = Dimensions.get('window');
	    return (
	        <Image style={{width: null,height:null}} source={require('./../../images/bg.png')}>
            <View style={[styles.overlay, { height: height, width: width}]} />
            <View style={styles.container}>
                <View style={styles.logo,{height: height * .5,flex: 1,justifyContent: 'center'}}>
                  <Image style={{width: 100,height:100}} source={require('./../../images/splash-logo.png')}></Image>
                </View>
                <View style={styles.logo,{height: height * .5, flex: 1,justifyContent: 'center'}}>
                  
                  <TouchableOpacity onPress={ () => {  console.log('add')  }} background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.green_button}>
                      <View style={styles.align_text, {width: width * .4}}>
                        <Text style={styles.green_button_text}>LOGIN IN</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={ () => {  console.log('add')  }} background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.transparent_button}>
                      <View style={styles.align_text, {width: width * .4}}>
                        <Text style={styles.green_button_text}>TAKE THE TOUR</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                </View>
            </View>
            
          </Image>
	    );
  }
}

HomePage.propTypes = {
  navigator: React.PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column'
  },
  logo : {
    alignSelf: 'center'
  },
  green_button : {
    backgroundColor: '#22c064',
    alignSelf: 'center',
    borderRadius: 30,
    padding: 10,
    margin: 20
  },
  green_button_text : {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  transparent_button : {
    alignSelf: 'center',
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    margin: 20
  },
  align_text : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black'
  }  
});