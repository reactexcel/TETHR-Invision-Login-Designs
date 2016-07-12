import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  ScrollView,
  DrawerLayoutAndroid
} from 'react-native';
 

import {map} from 'lodash'
import {SideMenu} from './common/sidemenu'

import Icon from 'react-native-vector-icons/MaterialIcons';


export class CategoryPage extends React.Component {
	constructor(props){
		super(props);
    this._generateSubCats = this._generateSubCats.bind(this)
	}
  _generateSubCats(){
      var {width, height} = Dimensions.get('window');
      let images = [];
      images = _.map([1,2,3,4,5,6], (i) => {
                if(i == 1){
                  return (
                    <View style={styles.subcat} key={i}>
                        <Image resizeMode="contain" style={{width: 150, height: 150}} source={require('./../../images/catsub1.png')} />
                    </View>
                  )
                }else if(i == 2){
                  return (
                    <View style={styles.subcat} key={i}>
                        <Image resizeMode="contain" style={{width: 150, height: 150}} source={require('./../../images/catsub2.png')} />
                    </View>
                  )
                }else if(i == 3){
                  return (
                    <View style={styles.subcat} key={i}>
                        <Image resizeMode="contain" style={{width: 150, height: 150}} source={require('./../../images/catsub3.png')} />
                    </View>
                  )
                }else if(i == 4){
                  return (
                    <View style={styles.subcat} key={i}>
                        <Image resizeMode="contain" style={{width: 150, height: 150}} source={require('./../../images/catsub4.png')} />
                    </View>
                  )
                }else if(i == 5){
                  return (
                    <View style={styles.subcat} key={i}>
                        <Image resizeMode="contain" style={{width: 150, height: 150}} source={require('./../../images/catsub5.png')} />
                    </View>
                  )
                }else if(i == 6){
                  return (
                    <View style={styles.subcat} key={i}>
                        <Image resizeMode="contain" style={{width: 150, height: 150}} source={require('./../../images/catsub6.png')} />
                    </View>
                  )
                }
            })
            return images;
  }
	render() {
	    var {height, width} = Dimensions.get('window');
      let subcats = this._generateSubCats()
	    return (
        <SideMenu  ui={this.props.ui} navigator={this.props.navigator} fetchCategoryList={this.props.fetchCategoryList} category={this.props.category}>
              <View style={{flex:1,backgroundColor: '#fff'}}>
                  <ScrollView style={{flex:1}}>
                    <View style={styles.container}>
                         {subcats}
                    </View>
                  </ScrollView>
              </View>
        </SideMenu>
	    )
  }
}

CategoryPage.propTypes = {
  navigator: React.PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  subcat:{ 
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#333'
  }
});