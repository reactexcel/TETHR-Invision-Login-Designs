import { fireAjax} from './../index';



export function fetchCategoryList(email,password){
	return fireAjax('v1/category/categorylist',{
			parent_id: -1,
			type: 'full'
		})
}

export function getCategoryProducts(id,sort_order,page,limit,product_data_type){
	return fireAjax('v1/category/products',{
			id: -1,
			sort_order: sort_order,
			page: page,
			limit: limit,
			product_data_type : product_data_type
		})
}