
import {SIGNUP_PAGE_AJAX,SIGNUP_SUCCESS,SIGNUP_ERROR} from './../../actions/signup/index' 
import Immutable from 'immutable';

export function ui(state = Immutable.fromJS({
  signup_page: {
    loading: false,
    signup: {
      status: false,
      error: '',
      data: {}
    }
  }
}),action){
  if(action.type === SIGNUP_PAGE_AJAX){
  	 return state.setIn(['signup_page','loading'],action.payload).
      setIn(['signup_page','signup'],{status: false,error: '',data: {}})
  }else if(action.type === SIGNUP_SUCCESS){
     return state.setIn(['signup_page','loading'],false).
      setIn(['signup_page','signup'],{status: true,error: '',data: action.payload})
  }else if(action.type === SIGNUP_ERROR){
     return state.setIn(['signup_page','loading'],false).
      setIn(['signup_page','signup'],{status: false, error: action.payload.toString()})
  }
  return state;
}