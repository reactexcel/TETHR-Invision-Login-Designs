import React from 'react';

import { connect } from 'react-redux';

import {SignupPage} from './../pages/signup'

import * as actions from './../actions/index'


class SignupContainer extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
	    return ( 
          <SignupPage navigator={this.props.navigator} googleSignup={this.props.onGoogleSignup} login_user={this.props.login} />
      )
  }
}


function mapStateToProps(state,props){
  state = state.toJS()  
  return {
    login : state.login
  }
}
const mapDispatchToProps = (dispatch) => {   //es6 way
     return {
      onGoogleSignup : (text) => {
        return dispatch(actions.loginTodo())
      }
     }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupContainer)
