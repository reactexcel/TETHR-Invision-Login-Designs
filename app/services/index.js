import {ToastAndroid, Platform} from 'react-native'
import { CONFIG } from './../config/index';

export function notify(text){
	if(Platform.OS === 'ios'){
		Alert(text)
	}else{
		ToastAndroid.show(text, ToastAndroid.SHORT)
	}
}

export function fireAjax(url, data,method = 'post'){
	console.info('AJAX');
	console.info(url);
	console.info(data);

	return fetch(CONFIG.api_url + url,{
		method: method,
		mode: 'cors', 
		cache: 'no-cache',
		headers: new Headers({
			'Access-Control-Allow-Headers' : '*',
			'APP_ID': CONFIG.app_id
		}),
		body: JSON.stringify(data)
	}).then( (response) => {
		if(response.status === 500){
			return new Promise( (resolve,reject) => {
				response.json().then((data) => {
					console.warn('AJAX ERROR');
					console.warn(data);
					reject(data)
				})
			})
			
		}else{
			return new Promise( (resolve,reject) => {
				response.json().then((data) => {
					console.info('AJAX SUCCESS');
					console.info(data);
					resolve(data);
				})
			})
		}
		
	})
}