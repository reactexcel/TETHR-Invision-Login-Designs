

import { createStore , applyMiddleware, compose} from 'redux'
import  reducer   from './../reducers/index'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'
import * as signup_actions from './../actions/signup/index'

const logger = createLogger({
	stateTransformer : (state) => {
		return state.toJS()
	}
});

let store = createStore(reducer, applyMiddleware(thunk,logger));

// to some basic tests to see if our reducers are working
// store.dispatch(signup_actions.signup('manish','prakash','manish@excellencetechnologies.in','java@123')).then( () => {

// });


export default store;