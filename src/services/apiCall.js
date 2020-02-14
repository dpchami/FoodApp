import request from './request'
import { ALL_PRODUCT_URL, LOGIN_URL, REGISTER_URL, VENDOR_LIST, CREATE_ORDER, ORDER_HISTORY, CUSTOM_PRODUCT_LIST } from './api_constants'

function doFetchMenu (option)
{
    const data = option
    return request({ data:data, url: ALL_PRODUCT_URL,method: 'POST' })
}

function doFetchVendor()
{
    return request({url: VENDOR_LIST, method: 'GET'})
}

function doLogin (username,password)
{
    const data = {
        username : username,
        password : password,
    }

    return request({ data: data, url: LOGIN_URL, method: 'POST' });
}

function doRegister (name,mobile,email,password,district,region,location)
{
    const data = {
        name: name,
        mobile: mobile,
        email: email,
        password: password,
        district: district,
	    region: region,
	    location: location
    }

    return request({ data: data, url: REGISTER_URL, method: 'POST' });
}

//this functions require token
function doCreateOrder(token, items)
{
    const data = {
        token: token,
        items: items
    }
    return request({ data: data, url: CREATE_ORDER, method: "POST" })
}

function doOrderHistory(token)
{
    const data = { 
        token: token
    }

    return request({ data: data, url: ORDER_HISTORY, method: "POST" })
}

function doFetchCustomProduct(type,value) {
    const data = {
        type: type,
        value: value
    }

    return request({ data: data, url: CUSTOM_PRODUCT_LIST , method: "POST" })
}

export default {
    doFetchMenu,
    doLogin,
    doRegister,
    doCreateOrder,
    doFetchVendor,
    doOrderHistory,
    doFetchCustomProduct
};