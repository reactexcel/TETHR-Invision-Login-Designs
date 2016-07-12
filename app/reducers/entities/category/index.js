import {CATEGORY_SUCCESS} from '../../../actions/category/index'

import Immutable from 'immutable';

export function category(state = Immutable.fromJS({}),action){
	if(action.type === CATEGORY_SUCCESS){
		return Immutable.fromJS(action.payload)
	}
  return state;
}