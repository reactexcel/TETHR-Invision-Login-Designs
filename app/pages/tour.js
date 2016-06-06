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


import Icon from 'react-native-vector-icons/MaterialIcons';


export class TourPage extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
	    var {height, width} = Dimensions.get('window');
	    return (
            
            <View style={styles.container}>
                <View style={[styles.overlay, { height: height, width: width}]} />
                
            </View>
	    );
  }
}

TourPage.propTypes = {
  navigator: React.PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column'
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