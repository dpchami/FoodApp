import { CUSTOM_PRODUCT_LIST } from "../services/api_constants";
import request from '../services/request';

export const fetchProduct = (type, option ) => ({
    type: type,
    payload:{ 
        option : option
    }
});

export const addCart = ( item ) => ({
    type: 'ADD_CART',
    payload: item
});

export const removeCart = ( item ) => ({
    type: 'REMOVE_CART',
    payload: item
});

export const clearCart = () => ({
	type: 'CLEAR_CART',
});

export const createOrder = (token, items) => ({
    type: 'CREATE_ORDER',
    payload: {
        token: token,
        items: items
    }
});

export const getHistory = (token) => ({
    type: 'GET_ORDER_HISTORY',
    payload : {
        token: token
    }
});

export const fetchVendor = () => ({
    type: 'GET_VENDOR_LIST'
});

export const fetchProductList = (type, value) => ({
    type: 'GET_CUSTOM_PRODUCT',
    payload : {
        type: type,
        value: value
    }
});
