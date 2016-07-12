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
import {notify} from '../../services/index'

import Carousel from 'react-native-carousel'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {map} from 'lodash'

export class SideMenu extends React.Component {
  constructor(props){
    super(props);
    this._navigationView = this._navigationView.bind(this)
    this.onCategoryPage = this.onCategoryPage.bind(this)
    this._drawCategory = this._drawCategory.bind(this)
    this.props.fetchCategoryList().then( () => {}, (error) => {
        notify('Unable To Fetch Category List' + error);
    });
  }
  onCategoryPage(cat_id){
      this.props.navigator.push({id:'category',passProps: {
        cat_id : cat_id
      }})
  }
  _drawCategory(category){
    let subcat = [];
    let self = this
    if(category.children && category.children.length > 0){
      subcat = _.map(category.children, (cat) => {
          return self._drawCategory(cat)
      })
    }
    return (
       <View key={category.id} style={styles.category_tree}>
           <TouchableOpacity onPress={ () => {   self.onCategoryPage(category.id)   }} background={TouchableNativeFeedback.SelectableBackground()}>
              <View style={styles.category_tree_node}>
                <Text>{category.name}</Text>
              </View>
           </TouchableOpacity>
          {subcat}
       </View>
    )
  }
  _renderDrawerProgress(){
    console.log(this.props.category);
    if(this.props.ui.category_page.drawer_loading){
      return (
        <View style={styles.container}>
             <ProgressBarAndroid styleAttr="Inverse" />
        </View>
      )
    }else{
      let category_tree = this._drawCategory(this.props.category)
      return (
        <ScrollView style={{flex: 1}}>
           <View style={{flex:1}}>
            {category_tree}
          </View>
        </ScrollView>
      )
    }
  }
  _navigationView() {
    let progress = this._renderDrawerProgress()
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
                {progress}
      </View>
    )
  }
  render() {
      var {height, width} = Dimensions.get('window')
      return (
        <DrawerLayoutAndroid
              ref="DRAWER_REF"
              drawerWidth={300}
              drawerPosition={DrawerLayoutAndroid.positions.Left}
              renderNavigationView={() => this._navigationView()}>
              <View style={{flex: 1}}>
                          <Icon.ToolbarAndroid
                              onIconClicked={  (pos) => {
                                    this.refs['DRAWER_REF'].openDrawer();
                              }}
                              navIconName="menu"
                              title={"Shits"}
                              style={styles.toolbar}
                              titleColor={"#333"}
                              overflowIconName="more-vert"
                              actions={[
                                {title: 'Search' , iconName: 'search', show:'always'}
                              ]}
                              onActionSelected={ () => {  }}>
                            </Icon.ToolbarAndroid>
                              {this.props.children}
                      </View>
        </DrawerLayoutAndroid>
      )
  }
}


SideMenu.propTypes = {
  navigator: React.PropTypes.any.isRequired,
  fetchCategoryList : React.PropTypes.any.isRequired,
  category: React.PropTypes.any.isRequired,
  ui: React.PropTypes.any.isRequired,
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