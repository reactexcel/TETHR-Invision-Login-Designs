import React from 'react';

import { connect } from 'react-redux';

import {TourPage} from './../pages/tour'

import * as signup_actions from './../actions/signup/index'
import * as login_actions from './../actions/login/index'


class TourContainer extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
	    return ( 
          <TourPage 
            navigator={this.props.navigator} 
           />
      )
  }
}


function mapStateToProps(state,props){
  state = state.toJS()  
  return {
  }
}
const mapDispatchToProps = (dispatch) => {   //es6 way
     return {
      
     }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourContainer)
