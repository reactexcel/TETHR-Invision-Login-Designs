import { createAction } from 'redux-actions';
import { fireAjax} from './../../services/index';

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
	return fireAjax('v1/customer/register',{
			email: email,
			firstname: firstname,
			lastname : lastname,
			password : password
	})
}

export function signup(firstname,lastname,email,password){
	return function (dispatch,getState){
		if(_.isEmpty(firstname)){
			return Promise.reject('FirstName Cannot Be Empty')
		}
		// if(_.isEmpty(lastname) ){
		// 	return new Promise( (resolve,reject) => {
		// 		dispatch(signupError(new Error('LastName Cannot Be Empty')));
		// 		return Promise.resolve()
		// 	})
		// } 
		if(_.isEmpty(email) ) {
			return Promise.reject('Email Cannot Be Empty')
		}
		if(_.isEmpty(password)) {
			return Promise.reject('Password Cannot Be Empty')
		}
		dispatch(signupLoading(true));
		return new Promise( (resolve,reject) => {
			signupAjax(firstname,lastname,email,password).then(
				(data) => {
					data.json().then( (data) => {
						console.log(data);
						dispatch(signupLoading(false));
						dispatch(signupSuccess(data));
						resolve(data);
					})	
					
				},
				(error) => {
					console.error(error);
					dispatch(signupLoading(false));
					dispatch(signupError(error));
					reject(error.message);
				}
			);
		})
	}
}
