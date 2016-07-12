import React from 'react';

import { connect } from 'react-redux';

import {CategoryPage} from './../pages/category'

import * as category_actions from './../actions/category/index'


class CategoryContainer extends React.Component {
	constructor(props){
		super(props);
    
	}
	render() {
	    return ( 
          <CategoryPage navigator={this.props.navigator} />
      )
  }
}


function mapStateToProps(state,props){
  state = state.toJS()  
  return {
    ui: state.ui
  }
}
const mapDispatchToProps = (dispatch) => {   //es6 way
     return {
     
     }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryContainer)
