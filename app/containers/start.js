import React from 'react';

import { connect } from 'react-redux';

import {StartPage} from './../pages/start'

import * as signup_actions from './../actions/signup/index'
import * as login_actions from './../actions/login/index'


class StartContainer extends React.Component {
	constructor(props){
		super(props);
    this.props.checkLoginState().then( (data) => {
      console.log(data);
      if(data.data && data.data.access_token){
        this.props.navigator.replace({id: 'landing'})
      }
    })
	}
	render() {
	    return ( 
          <StartPage 
            navigator={this.props.navigator} 
            login={this.props.login} />
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
      checkLoginState : () => {
        return dispatch(login_actions.checkLoginState())
      }
     }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartContainer)
