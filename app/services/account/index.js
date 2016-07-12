import { fireAjax} from './../index';

import {AsyncStorage} from 'react-native'

export function loginAsync(email,password){
	return fireAjax('v1/customer/login',{
			email: email,
			password : password
		})
}

export function socialLoginAsync(email,social_id,social_type,firstname,lastname,picture){
	return fireAjax('v1/customer/social_account',{
			email: email,
			social_id : social_id,
			social: social_type,
			firstname: firstname,
			lastname: lastname,
			picture: picture
		})
}

export function loginSetAsync(data){
	return AsyncStorage.setItem('login_data',JSON.stringify(data))
}

export function loginCheckAsync(){
	return AsyncStorage.getItem('login_data')
}