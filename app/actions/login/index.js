import { createAction } from 'redux-actions';
import { CONFIG } from './../../config/index'

export const LOGIN_TODO_REQUEST = "LOGIN_TODO_REQUEST";
export const LOGIN_TODO_SUCCESS = "LOGIN_TODO_SUCCESS";
export const LOGIN_TODO_ERROR = "LOGIN_TODO_ERROR";

export function loginTodoError(error){
	return createAction(LOGIN_TODO_ERROR)(error);
}
export function loginTodoSuccess(data){
	return createAction(LOGIN_TODO_SUCCESS)(data);
}

function loginAsync(){
	return fetch(CONFIG.api_url + 'v1/customer/login',{
		method: 'post',
		headers: new Headers({
			'APP_ID': CONFIG.app_id
		}),
		body: JSON.stringify({
			email: email,
			password : password
		})
	})
}

export function loginTodo(id,text,mark){
	return function (dispatch,getState){
		dispatch(signupLoading(true));
		return loginAsync().then(
			(data) => {
				dispatch(signupLoading(false));
				dispatch(loginTodoSuccess(data));
			},
			(error) => {
				dispatch(signupLoading(false));
				dispatch(loginTodoError(error));
			}
		);
	}
}
