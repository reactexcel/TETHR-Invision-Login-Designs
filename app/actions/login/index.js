import { createAction } from 'redux-actions';
import { fireAjax} from './../../services/index';
import * as _ from 'lodash'

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function loginLoading(show){
	return createAction(LOGIN_REQUEST)(show);
}
export function loginSuccess(data){
	return createAction(LOGIN_SUCCESS)(data);
}


function loginAsync(email,password){
	return fireAjax('v1/customer/login',{
			email: email,
			password : password
		})
}

export function login(email,password){
	return function (dispatch,getState){
		if(_.isEmpty(email)){
			return new Promise.reject('Email Cannot Be Empty')
		}
		if(_.isEmpty(password)){
			return new Promise.reject('Password Cannot Be Empty')
		}
		dispatch(loginLoading(true));
		return new Promise( (resolve,reject) => {
			loginAsync(email,password).then(
				(data) => {
					console.log(data);
					dispatch(loginLoading(false));
					dispatch(loginSuccess(data));
					resolve(data);
					
				},
				(error) => {
					console.error(error);
					dispatch(loginLoading(false));
					reject(error.message);
				}
			);	
		}) 
	}
}
