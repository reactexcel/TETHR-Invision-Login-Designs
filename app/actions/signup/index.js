import { createAction } from 'redux-actions';
import { CONFIG } from './../../config/index'

export const SIGNUP_PAGE_AJAX = "SIGNUP_AJAX";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

import * as _ from 'lodash'

export function signupLoading(show){
	return createAction(SIGNUP_PAGE_AJAX)(show);
}
export function signupSuccess(data){
	return createAction(SIGNUP_SUCCESS)(data)
}
export function signupError(error){
	return createAction(SIGNUP_ERROR)(error)
}


function signupAjax(firstname,lastname,email,password){
	return fetch(CONFIG.api_url + 'v1/customer/register',{
		method: 'post',
		headers: new Headers({
			'APP_ID': CONFIG.app_id
		}),
		body: JSON.stringify({
			email: email,
			firstname: firstname,
			lastname : lastname,
			password : password
		})
	})
}

export function signup(firstname,lastname,email,password){
	return function (dispatch,getState){
		if(_.isEmpty(firstname)){
			return new Promise( (resolve,reject) => {
				dispatch(signupError(new Error('FirstName Cannot Be Empty')));
				return Promise.resolve()
			})
		}
		// if(_.isEmpty(lastname) ){
		// 	return new Promise( (resolve,reject) => {
		// 		dispatch(signupError(new Error('LastName Cannot Be Empty')));
		// 		return Promise.resolve()
		// 	})
		// } 
		if(_.isEmpty(email) ) {
			return new Promise( (resolve,reject) => {
				dispatch(signupError(new Error('Email Cannot Be Empty')));
				return Promise.resolve()
			})
		}
		if(_.isEmpty(password)) {
			return new Promise( (resolve,reject) => {
				dispatch(signupError(new Error('Password Cannot Be Empty')));
				return Promise.resolve()
			})
		}
		dispatch(signupLoading(true));
		return signupAjax(firstname,lastname,email,password).then(
			(data) => {
				data.json().then( (data) => {
					console.log(data);
					dispatch(signupLoading(false));
					dispatch(signupSuccess(data));
				})	
				
			},
			(error) => {
				console.error(error);
				dispatch(signupLoading(false));
				dispatch(signupError(error));
			}
		);
	}
}
