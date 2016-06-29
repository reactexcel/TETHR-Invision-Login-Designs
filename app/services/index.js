import {ToastAndroid, Platform} from 'react-native'
import { CONFIG } from './../config/index';

export function notify(text){
	if(Platform.OS === 'ios'){
		Alert(text)
	}else{
		ToastAndroid.show(text, ToastAndroid.SHORT)
	}
}

export function fireAjax(url, data){
	return fetch(CONFIG.api_url + 'v1/customer/login',{
		method: 'post',
		mode: 'cors', 
		cache: 'no-cache',
		headers: new Headers({
			'APP_ID': CONFIG.app_id
		}),
		body: JSON.stringify(data)
	}).then( (response) => {
		if(response.status === 500){
			return new Promise( (resolve,reject) => {
				response.json().then((data) => {
					reject(data)
				})
			})
			
		}else{
			return response.json()
		}
		
	})
}