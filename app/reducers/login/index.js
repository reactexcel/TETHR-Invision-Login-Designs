
import {LOGIN_TODO_REQUEST,LOGIN_TODO_SUCCESS,LOGIN_TODO_ERROR,LOGIN_CHECK_SUCCESS} from './../../actions/login/index' 
import Immutable from 'immutable';

export function login(state = Immutable.fromJS({
  login_request: false,
  login_error : '',
  login_data : {}
}),action){
  if(action.type === LOGIN_TODO_REQUEST){
  	 return state.set('login_request',true)
  }else if(action.type === LOGIN_TODO_SUCCESS){
     return state.set('login_data',action.payload).set('login_request',false)
  }else if(action.type === LOGIN_TODO_ERROR){
     return state.set('login_error',action.error).set('login_request',false)
  }else if(action.type === LOGIN_CHECK_SUCCESS){
     return state.set('login_data',Immutable.fromJS(action.payload))
  }
  return state;
}