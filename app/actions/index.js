import { createAction } from 'redux-actions';
import {GoogleSignin} from 'react-native-google-signin';

export const LOGIN_TODO_REQUEST = "LOGIN_TODO_REQUEST";
export const LOGIN_TODO_SUCCESS = "LOGIN_TODO_SUCCESS";
export const LOGIN_TODO_ERROR = "LOGIN_TODO_ERROR";



export function loginTodoRequest(){
	return createAction(LOGIN_TODO_REQUEST)();
}
export function loginTodoError(error){
	return createAction(LOGIN_TODO_ERROR)(error);
}
export function loginTodoSuccess(data){
	return createAction(LOGIN_TODO_SUCCESS)(data);
}

function loginAsync(){
	return new Promise( (resolve,reject) => {
			GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
		        // play services are available. can now configure library
		        GoogleSignin.configure({
		        })
		        .then(() => {
		            // you can now call currentUserAsync()
		            console.log('here');
		            GoogleSignin.currentUserAsync().then((user) => {
		              console.log('USER', user);
		              if(user){
		                resolve(user);
		              }else{
		                  console.log('user not found');
		                  GoogleSignin.signIn()
		                    .then((user) => {
		                      console.log(user);
		                      resolve(user);
		                    })
		                    .catch((err) => {
		                      reject(err);
		                    })
		                    .done();
		              }
		            }).catch(()=>{
		            	reject('Could Not Get Current User')
		            }).done();
		        }).catch( () => {
		        	reject('Configure Failed')
		        });
		    }).catch(() => {
		    	reject(new Error('Google Play Services Not Configured'))
		    })
	})
	
}

export function loginTodo(id,text,mark){
	return function (dispatch,getState){
		dispatch(loginTodoRequest());
		return loginAsync().then(
			(data) => {
				dispatch(loginTodoSuccess(data));
			},
			(error) => {
				dispatch(loginTodoError(error));
			}
		);
	}
}
