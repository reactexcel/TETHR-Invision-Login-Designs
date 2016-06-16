

import { createStore , applyMiddleware, compose} from 'redux'
import  reducer   from './../reducers/index'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'
import * as actions from './../actions/index'

const logger = createLogger();

let store = createStore(reducer, applyMiddleware(thunk,logger));

//to some basic tests to see if our reducers are working
store.dispatch(actions.loginTodo()).then( () => {



});


export default store;