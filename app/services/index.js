import {ToastAndroid, Platform} from 'react-native'

export function notify(text){
	if(Platform.OS === 'ios'){
		Alert(text)
	}else{
		ToastAndroid.show(text, ToastAndroid.SHORT)
	}
}