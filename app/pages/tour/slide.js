import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export class TourSlide extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={{alignItems: 'stretch','flex': 1}}>
           <View style={styles.page}>
              <Image style={styles.image} source={require('./../../../images/tour-tick.png')}/>

              <Text style={styles.title}>{this.props.heading}</Text>

              <Text style={styles.text}>{this.props.text}</Text>
            </View>
      </View>
    )
  }
}

TourSlide.propTypes = {
  heading: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  title : {
      fontSize: 30,
      color: '#333',
      textAlign: 'center',
      margin: 40
  },
  image : {
    width: 100,
    height: 100,
  },
  text: {
      fontSize: 15,
      color: '#333',
      textAlign: 'center',
      padding: 20,
      marginLeft: 40,
      marginRight: 40
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});