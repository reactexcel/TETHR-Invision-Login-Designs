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
  Picker
} from 'react-native';

import Carousel from 'react-native-carousel'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {map} from 'lodash'

export class ProductPage extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      select_size: '',
      selected_color: '',
      picker : ['Small','Medium','Large'],
      colors : ['blue','green']
    }
    this._generateImages = this._generateImages.bind(this);
    this._generatePicker = this._generatePicker.bind(this);
    this._generateColors = this._generateColors.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);
	}
  _generateImages(){
    var {width, height} = Dimensions.get('window');
    let images = [];
    images = map([1,2,3,4], (i) => {
        if(i == 1){
          return (
            <View key={i}>
                <Image resizeMode="contain" style={{width: width, height: 300}} source={require('./../../images/product1.png')} />
            </View>
          )
        }else if(i == 2){
          return (
            <View key={i}>
                <Image resizeMode="contain" style={{width: width, height: 300}} source={require('./../../images/product2.png')} />
            </View>
          )
        }else if(i == 3){
          return (
            <View key={i}>
                <Image resizeMode="contain" style={{width: width, height: 300}} source={require('./../../images/product3.png')} />
            </View>
          )
        }else if(i == 4){
          return (
            <View key={i}>
                <Image resizeMode="contain" style={{width: width, height: 300}} source={require('./../../images/product4.png')} />
            </View>
          )
        }
    })
    return images;
  }
  _generatePicker(){
    let picker = [];
    picker = map(this.state.picker, (size) => {
        return (
              <Picker.Item key={size} label={size} value={size} />
          )
    })
    return picker;
  }
  onSelectColor(color){
      this.setState({
        selected_color : color
      })
  }
  _generateColors(){
    let colors = [];
    let self = this;
    colors = map(this.state.colors, (color,i) => {
        let is_selected_color = false;
        let icon;
        if(color === self.state.selected_color){
          is_selected_color = true;
          icon = <Icon style={{color: 'white'}} name="check" size={20} />
        }
        return (
          <TouchableOpacity key={i} onPress={ () => {  self.onSelectColor(color)  }}>
            <View style={[styles.color,{backgroundColor: color}, is_selected_color && styles.color_active]}>
                {icon}
            </View>
          </TouchableOpacity>
         )
    })
    return colors;
  }
	render() {
	    var {height, width} = Dimensions.get('window');
      let images = this._generateImages(); 
      let picker = this._generatePicker();
      let colors = this._generateColors();
	    return (
        <View style={{flex: 1}}>
            <Icon.ToolbarAndroid
                onIconClicked={  (pos) => {
                      this.props.navigator.pop();
                }}
                navIconName="arrow-back"
                title={"Product Name"}
                style={styles.toolbar}
                titleColor={"#333"}
                action={[]}>
              </Icon.ToolbarAndroid>
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
                  <View>
                      <View style={styles.size_color}>
                        <View style={{flex: 1}}>
                          <View style={styles.picker}>
                            <Picker
                                selectedValue={this.state.select_size}
                                onValueChange={(size) => this.setState({select_size: size})}>
                              {picker}
                            </Picker>
                          </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row',justifyContent:'flex-end',alignItems: 'flex-end'}}>
                              {colors}
                        </View>
                    </View>
                  </View>

                  <View style={{height: 30,backgroundColor: 'white'}}>
                  </View>
                  <View>

                      <View style={styles.tab_heading_wrapper}>

                          <View style={[styles.tab,{borderRightWidth: 1,borderRightColor: '#f3f3f3'},styles.tab_selected]}> 
                                <Text style={styles.tab_text}>Info</Text>
                          </View>
                          <View style={styles.tab}>
                                <Text style={styles.tab_text}>Delivery</Text>
                          </View>

                      </View>
                      <View style={styles.tab_content_wrapper}>
                          <Text style={styles.tab_content_text}>5.5 inch FHD IPS Display</Text>
                          <Text style={styles.tab_content_text}>1920 x 1080 pixels Resolution with 2.5D Curved Screen</Text>
                          <Text style={styles.tab_content_text}>4 GB RAM and 32 GB ROM with Expandable Memory upto 128 GB</Text>
                          <Text style={styles.tab_content_text}>13 MP Primary Camera and 5 MP Secondary Camera</Text>
                          <Text style={styles.tab_content_text}>MediaTek Helio P10 – 1.8 Ghz Octa Core (MT6755) Processor</Text>
                          <Text style={styles.tab_content_text}>4000 mAh Li-Poly Battery</Text>
                          <Text style={styles.tab_content_text}>Android v5.1.1 (Lollipop) Android on Steroids (AOS) OS</Text>
                          <Text style={styles.tab_content_text}>Dual SIM (LTE+LTE) and Fingerprint Sensor</Text>
                      </View>

                  </View>
                  <View>

                      <TouchableOpacity onPress={ () => {   }}>
                        <View style={styles.full_cart}>
                              <Text style={{color: 'white', fontSize: 20}}>ADD TO CART</Text>
                        </View>
                      </TouchableOpacity>

                  </View>

                </ScrollView>
              </View>
        </View>
      )
  }
}

ProductPage.propTypes = {
  navigator: React.PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
   toolbar: {
    height: 56,
  },
  size_color: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  picker : {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius : 2,
    borderColor: '#333',
    margin: 10,
    width: 100
  },
  color: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 10
  },
  color_active: {
    width: 50,
    height: 50
  },
  tab_heading_wrapper: {
    flex: 1, 
    flexDirection: 'row',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3'
  },
  tab: {
    flex: 1,
    alignSelf: 'center',
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  tab_selected: {
    borderBottomWidth: 2,
    borderBottomColor: '#4b77da'
  },
  tab_text: {
    textAlign: 'center',
    fontSize: 20
  },
  tab_content_wrapper: {
    paddingLeft: 10
  },
  tab_content_text: {
    fontSize: 20,
    padding: 5
  },
  full_cart : {
    backgroundColor: '#22c064',
    height: 80,
    flex : 1,
    alignItems: 'center',
    justifyContent : 'center'
  }
});
