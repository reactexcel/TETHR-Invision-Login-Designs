import React from 'react';

import { connect } from 'react-redux';

import {LoginPage} from './../pages/login'

import * as signup_actions from './../actions/signup/index'
import * as login_actions from './../actions/login/index'


class LoginContainer extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
	    return ( 
          <LoginPage 
            navigator={this.props.navigator} 
            onLogin={this.props.onLogin} 
            onSocialLogin={this.props.onSocialLogin}
            login_user={this.props.login}
            ui={this.props.ui} />
      )
  }
}


function mapStateToProps(state,props){
  state = state.toJS()  
  return {
    login : state.login,
    ui: state.ui
  }
}
const mapDispatchToProps = (dispatch) => {   //es6 way
     return {
      onLogin : (email,password) => {
        return dispatch(login_actions.login(email,password))
      },
      onSocialLogin : (email,social_id,social_type,firstname,lastname,picture) => {
        return dispatch(login_actions.socialLogin(email,social_id,social_type,firstname,lastname,picture))
      }
     }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)
