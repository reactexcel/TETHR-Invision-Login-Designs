import { createAction } from 'redux-actions';
import * as _ from 'lodash'
import { fetchCategoryList , getCategoryProducts } from './../../services/category/index'

export const CATEGORY_REQUEST = "CATEGORY_REQUEST";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";

export function categoryRequest(show){
	return createAction(CATEGORY_REQUEST)(show);
}
export function categorySuccess(data){
	return createAction(CATEGORY_SUCCESS)(data);
}


export function categoryList(parent_id = -1,type = 'full'){
	return function (dispatch,getState){
		dispatch(categoryRequest(true));
		return new Promise( (resolve,reject) => {
			fetchCategoryList(parent_id,type).then(
				(data) => {
					console.log(data);
					dispatch(categoryRequest(false));
					dispatch(categorySuccess(data.data));
					resolve(data.data);
					
				},
				(error) => {
					console.error(error);
					dispatch(categoryRequest(false));
					reject(error.message);
				}
			);	
		}) 
	} 
}

export const CATEGORY_PRODUCT_REQUEST = "CATEGORY_PRODUCT_REQUEST"
export const CATEGORY_PRODUCT_SUCCESS = "CATEGORY_PRODUCT_SUCCESS"

export function categoryProductRequest(show){
	return createAction(CATEGORY_PRODUCT_REQUEST)(show);
}
export function categoryProductSuccess(data){
	return createAction(CATEGORY_PRODUCT_REQUEST)(data);
}

export function categoryProductRequest(id,sort_order = 'ASC',type = 'position',page = 0,limit = 8,product_data_type = 'full'){
	return function (dispatch,getState){
		dispatch(categoryProductRequest(true));
		return new Promise( (resolve,reject) => {
			getCategoryProducts(id,sort_order,type,page,limit,product_data_type).then(
				(data) => { 
					console.log(data);
					dispatch(categoryProductRequest(false));
					dispatch(categoryProductSuccess(data.data));
					resolve(data.data);
				},
				(error) => {
					console.error(error);
					dispatch(categoryProductRequest(false));
					reject(error.message);
				}
			);	
		}) 
	} 
}