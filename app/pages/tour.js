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

import Carousel from 'react-native-carousel'

import Icon from 'react-native-vector-icons/MaterialIcons';

var {width, height} = Dimensions.get('window');

import {TourSlide} from './tour/slide'

import {map} from 'lodash'

export class TourPage extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      tour: [{
        heading: 'Slide1',
        text: 'Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc'
      },{
        heading: 'Slide2',
        text: 'Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc'
      },{
        heading: 'Slide3',
        text: 'Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc Abc'
      }]
    }
    this._generateSlides = this._generateSlides.bind(this);
	}
  _generateSlides(){
    let slides = [];
    let i = 0;
    slides = map(this.state.tour,(slide) => {
      return (
         <TourSlide key={i} heading={slide.heading} text={slide.text} />
      )
      i++;
    })
    return slides;
  }
	render() {
	    var {height, width} = Dimensions.get('window');
      let slides = this._generateSlides();

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
                    justifyContent: 'center'}}>

                        <TouchableOpacity onPress={ () => {  this.props.navigator.pop()  }}>
                          <View style={styles.cross}>
                            <Icon size={30} name="close"></Icon>
                          </View>
                        </TouchableOpacity>

                        <Carousel indicatorColor="#22c064" indicatorOffset={0}  hideIndicators={false} indicatorAtBottom={true} loop={false} animate={false} width={width * .9}>
                            {slides}
                        </Carousel>
                      
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
  cross: {
    alignSelf: 'flex-end',
    padding: 20
  }
});
