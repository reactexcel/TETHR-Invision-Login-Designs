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
  ScrollView,
  ProgressBarAndroid,
  DrawerLayoutAndroid
} from 'react-native';
import {notify} from '../services/index'

import Carousel from 'react-native-carousel'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {map} from 'lodash'

import {SideMenu} from './common/sidemenu'

export class LandingPage extends React.Component {
  constructor(props){
    super(props);
    this._generateImages = this._generateImages.bind(this)
    this._generateSubCats = this._generateSubCats.bind(this)
  }
  _generateImages(){
    var {width, height} = Dimensions.get('window');
    let images = [];
    images = map([1,2,3,4], (i) => {
        if(i == 1){
          return (
            <View key={i}>
                <Image resizeMode="cover" style={{width: width, height: 300}} source={require('./../../images/category1.png')} />
            </View>
          )
        }else if(i == 2){
          return (
            <View key={i}>
                <Image resizeMode="cover" style={{width: width, height: 300}} source={require('./../../images/category2.png')} />
            </View>
          )
        }else if(i == 3){
          return (
            <View key={i}>
                <Image resizeMode="cover" style={{width: width, height: 300}} source={require('./../../images/category3.png')} />
            </View>
          )
        }else if(i == 4){
          return (
            <View key={i}>
                <Image resizeMode="cover" style={{width: width, height: 300}} source={require('./../../images/category4.png')} />
            </View>
          )
        }
    })
    return images;
  }
  _generateSubCats(){
      var {width, height} = Dimensions.get('window');
      let images = [];
      images = map([1,2,3,4,5,6], (i) => {
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
      let images = this._generateImages(); 
      let subcats = this._generateSubCats();
      return (
        <SideMenu ui={this.props.ui} navigator={this.props.navigator} fetchCategoryList={this.props.fetchCategoryList} category={this.props.category}>
          <View style={{flex:1,backgroundColor: '#fff'}}>
            <ScrollView style={{flex: 1}}>
              <View style={{
                height: 300,
                borderRadius: 5,
                flex: 1,
                justifyContent: 'center'
              }}> 
                <Carousel indicatorColor="#22c064" indicatorOffset={0}  hideIndicators={false} indicatorAtBottom={true} loop={false} animate={false} width={width}>
                    {images}
                </Carousel>
              </View>
              <View style={styles.container}>
                  {subcats}
              </View>
            </ScrollView>
          </View>
        </SideMenu>
      )
  }
}


LandingPage.propTypes = {
  navigator: React.PropTypes.any.isRequired,
  ui: React.PropTypes.any.isRequired,
  fetchCategoryList : React.PropTypes.any.isRequired,
  login : React.PropTypes.any.isRequired,
  category: React.PropTypes.any.isRequired
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    flexWrap: 'wrap'
  },
   toolbar: {
    height: 56,
  },
  subcat:{ 
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#333'
  },
  category_tree: {
    paddingLeft: 10
  },
  category_tree_node: {
    margin: 10
  }
})