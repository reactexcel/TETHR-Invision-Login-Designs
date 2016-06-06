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
  Slider
} from 'react-native';

import Carousel from 'react-native-looped-carousel'

import Icon from 'react-native-vector-icons/MaterialIcons';

var {width, height} = Dimensions.get('window');

export class TourPage extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      size: {
          width: width *. 8,
          height: height *. 8
      } 
    }
    this._onLayoutDidChange = this._onLayoutDidChange.bind(this);
	}
   _onLayoutDidChange(e) {
    var layout = e.nativeEvent.layout;
    this.setState({size: {width: layout.width, height: layout.height}});
  }
	render() {
	    var {height, width} = Dimensions.get('window');
	    return (
            <Image style={{width: null,height:null}} source={require('./../../images/bg.png')}>
              <View style={[styles.overlay, { height: height, width: width}]} />
              <View style={styles.container}>
                  <View style={{
                    marginTop: height * .1 * .5, 
                    marginBottom: height * .1 * .5, 
                    marginLeft: width * .1 * .5, 
                    marginRight: width * .1 * .5,
                    width: width * .9, 
                    height : height * .9,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'}}>

                       <View style={{flex: 1}} onLayout={this._onLayoutDidChange}>
                        <Carousel delay={500} style={this.state.size}>
                            <View style={this.state.size}>
                                   
                                   <Image style={{width: 100,height: 100}} source={require('./../../images/tour-tick.png')}/>
                      
                                   <Text style={styles.title}>SLIDE1</Text>

                                   <Text style={styles.text}>Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc </Text>

                            </View>
                            
                            <View style={this.state.size}>
                                  <Image style={{width: 100,height: 100}} source={require('./../../images/tour-tick.png')}/>
                      
                                   <Text style={styles.title}>SLIDE2</Text>

                                   <Text style={styles.text}>Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc </Text>

                            </View>
                            <View style={this.state.size}>
                                <Image style={{width: 100,height: 100}} source={require('./../../images/tour-tick.png')}/>
                      
                                   <Text style={styles.title}>SLIDE3</Text>

                                   <Text style={styles.text}>Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc </Text>

                            </View>
                        </Carousel>
                      </View>
                     
                     
                  </View>
              </View>
            </Image>
	    )
  }
}

TourPage.propTypes = {
  navigator: React.PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black'
  },
  title : {
      fontSize: 50,
      color: '#333'
  },
  text: {
      fontSize: 30,
      color: '#333'
  }
});