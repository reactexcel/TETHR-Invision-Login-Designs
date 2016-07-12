
import {SIGNUP_PAGE_AJAX,SIGNUP_SUCCESS,SIGNUP_ERROR} from './../../actions/signup/index' 
import {LOGIN_REQUEST,LOGIN_SUCCESS} from './../../actions/login/index'
import {CATEGORY_REQUEST} from '../../actions/category/index'


import Immutable from 'immutable';

export function ui(state = Immutable.fromJS({
  signup_page: {
    loading: false,
    signup: {
      status: false,
      error: '',
      data: {}
    }
  },
  login_page: {
    loading: false
  },
  category_page : {
    drawer_loading : false
  }
}),action){
  if(action.type === SIGNUP_PAGE_AJAX){
  	 return state.setIn(['signup_page','loading'],action.payload).
      setIn(['signup_page','signup'],{status: false,error: '',data: {}})
  }else if(action.type === SIGNUP_SUCCESS){
     return state.setIn(['signup_page','loading'],false).
      setIn(['signup_page','signup'],{status: true,error: '',data: action.payload})
  }else if(action.type === LOGIN_REQUEST){
     return state.setIn(['login_page','loading'],action.payload)
  }else if(action.type === CATEGORY_REQUEST){
      return state.setIn(['home_page','drawer_loading'],action.payload)
  }
  return state;
}