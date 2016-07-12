import { createAction } from 'redux-actions';
import * as _ from 'lodash'
import { loginAsync , socialLoginAsync, loginCheckAsync , loginSetAsync } from './../../services/account/index'

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function loginLoading(show){
	return createAction(LOGIN_REQUEST)(show);
}
export function loginSuccess(data){
	return createAction(LOGIN_SUCCESS)(data);
}


export function socialLogin(email,social_id,social_type,firstname,lastname,picture){
	return function (dispatch,getState){
		if(_.isEmpty(email)){
			return Promise.reject('Email Cannot Be Empty')
		}
		if(_.isEmpty(social_id)){
			return Promise.reject('Social ID Cannot Be Empty')
		}
		if(_.isEmpty(social_type)){
			return Promise.reject('Social Type Cannot Be Empty')
		}
		dispatch(loginLoading(true));
		return new Promise( (resolve,reject) => {
			socialLoginAsync(email,social_id,social_type,firstname,lastname,picture).then(
				(data) => {
					console.log(data);
					dispatch(loginLoading(false));
					dispatch(loginSuccess(data));
					loginSetAsync(data)
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


export function login(email,password){
	return function (dispatch,getState){
		if(_.isEmpty(email)){
			return Promise.reject('Email Cannot Be Empty')
		}
		if(_.isEmpty(password)){
			return Promise.reject('Password Cannot Be Empty')
		}
		dispatch(loginLoading(true));
		return new Promise( (resolve,reject) => {
			loginAsync(email,password).then(
				(data) => {
					console.log(data);
					dispatch(loginLoading(false));
					dispatch(loginSuccess(data));
					loginSetAsync(data);
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

export const LOGIN_CHECK_SUCCESS = "LOGIN_CHECK_SUCCESS";

export function loginCheckSuccess(data){
	return createAction(LOGIN_CHECK_SUCCESS)(data);
}


export function checkLoginState(){
	return function (dispatch,getState){
		return new Promise( (resolve,reject) => {
			loginCheckAsync().then(
				(data) => {
					if(!data){
						data = {}
					}else{
						data = JSON.parse(data);
					}
					dispatch(loginCheckSuccess(data));
					resolve(data);
					
				},
				(error) => {
					console.error(error);
					dispatch(loginCheckSuccess({}));
					reject(error.message);
				}
			);	
		}) 
	}
}