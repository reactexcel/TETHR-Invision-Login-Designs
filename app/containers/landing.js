import React from 'react';

import { connect } from 'react-redux';

import {LandingPage} from './../pages/landing'

import * as login_actions from './../actions/login/index'
import * as category_actions from './../actions/category/index'


class LandingContainer extends React.Component {
	constructor(props){
		super(props);
    
	}
	render() {
	    return ( 
          <LandingPage 
            navigator={this.props.navigator} 
            fetchCategoryList={this.props.fetchCategoryList}
            login={this.props.login}
            ui={this.props.ui}
            category={this.props.category} />
      )
  }
}


function mapStateToProps(state,props){
  state = state.toJS()  
  return {
    login : state.login,
    category: state.entities.category,
    ui: state.ui
  }
}
const mapDispatchToProps = (dispatch) => {   //es6 way
     return {
      fetchCategoryList : () => {
        return dispatch(category_actions.categoryList())
      }
     }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingContainer)
