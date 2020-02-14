import { call, put, takeLatest } from 'redux-saga/effects';

import Menu from '../services/apiCall';

function* fetchMenuTask(action) {
    try {
        yield put({
            type: 'FETCH_PRODUCT_LOADING',
        });
        
        const { payload } = action;

        console.log(payload.option);

        const res = yield call(Menu.doFetchMenu, payload.option);
        console.log(res);

        if (res.status === 200) {
            yield put({
                type: 'FETCH_PRODUCT_SUCCESS',
                payload: res.data
            });
        } else {
            yield put({
                type: 'FETCH_PRODUCT_ERROR',
                payload: res.data,
            })
        }
    } catch (e) {
        const payload = typeof e === 'string' ? { message: e } : e.data;
        yield put({
            type: 'FETCH_PRODUCT_ERROR',
            payload
        });
    }
}

function* fetchDrinkTask(action) {
    try {
        yield put({
            type: 'FETCH_DRINK_LOADING',
        });
        
        const { payload } = action;
        console.log(payload.option);

        const res = yield call(Menu.doFetchMenu, payload.option);
        console.log(res);

        if (res.status === 200) {
            yield put({
                type: 'FETCH_DRINK_SUCCESS',
                payload: res.data
            });
        } else {
            yield put({
                type: 'FETCH_DRINK_ERROR',
                payload: res.data,
            })
        }
    } catch (e) {
        const payload = typeof e === 'string' ? { message: e } : e.data;
        yield put({
            type: 'FETCH_DRINK_ERROR',
            payload
        });
    }
}

function* fetchSpecialTask(action) {
    try {
        yield put({
            type: 'FETCH_SPECIAL_LOADING',
        });
        
        const { payload } = action;

        const res = yield call(Menu.doFetchMenu, payload.option);
        console.log(res);

        if (res.status === 200) {
            yield put({
                type: 'FETCH_SPECIAL_SUCCESS',
                payload: res.data
            });
        } else {
            yield put({
                type: 'FETCH_SPECIAL_ERROR',
                payload: res.data,
            })
        }
    } catch (e) {
        const payload = typeof e === 'string' ? { message: e } : e.data;
        yield put({
            type: 'FETCH_SPECIAL_ERROR',
            payload
        });
    }
}

function* createOrderTask(action){
    try {
        yield put({
            type: 'ORDER_REQUEST_LOADING'
        });

        const { payload } = action;

        const res = yield call(Menu.doCreateOrder,payload.token,payload.items);

        if (res.status === 200){
            yield put({
                type: 'ORDER_REQUEST_MESSAGE',
                payload: res.data
            });
        } else {
            yield put({
                type: 'ORDER_REQUEST_ERROR',
                payload: res.data
            });
        }

        
    } catch (error) {
        var payload;
         if (typeof error === "string"){
             payload = error
         } else {
             payload = error.data
         }

         yield put({
             type : 'ORDER_REQUEST_ERROR',
             payload
         })
    }
}

function* fetchVendorTask(action){
    try {
        yield put({
            type: 'VENDOR_REQUEST_LOADING'
        });

        const res = yield call(Menu.doFetchVendor);

        if (res.status === 200){
            yield put({
                type: 'VENDOR_REQUEST_MESSAGE',
                payload: res.data
            });
        } else {
            yield put({
                type: 'VENDOR_REQUEST_ERROR',
                payload: res.data
            });
        }
    } catch (error) {
        var payload;
        if (typeof error === "string"){
            payload = error
        } else {
            payload = error.data
        }

        yield put({
            type : 'VENDOR_REQUEST_ERROR',
            payload
        });
    }
}
function* fetchHistoryTask(action){
    try {
        yield put({
            type: 'HISTORY_REQUEST_LOADING'
        });

        const { payload } = action;

        const res = yield call(Menu.doOrderHistory,payload.token);

        if (res.status === 200){
            yield put({
                type: 'HISTORY_REQUEST_MESSAGE',
                payload: res.data
            });
        } else {
            yield put({
                type: 'HISTORY_REQUEST_ERROR',
                payload: res.data
            });
        }
        
    } catch (error) {
        var payload;
        if (typeof error === "string"){
            payload = error
        } else {
            payload = error.data
        }

        yield put({
            type : 'HISTORY_REQUEST_ERROR',
            payload
        });
    }
}


function* fetchCustomProductTask(action){
    try {
        yield put({
            type: 'CUSTOM_PRODUCT_LOADING'
        });

        const { payload } = action;

        const res = yield call(Menu.doFetchCustomProduct,payload.type,payload.value);

        if (res.status === 200){
            yield put({
                type: 'CUSTOM_PRODUCT_MESSAGE',
                payload: res.data
            });
        } else {
            yield put({
                type: 'CUSTOM_PRODUCT_ERROR',
                payload: res.data
            });
        }
        
    } catch (error) {
        var payload;
        if (typeof error === "string"){
            payload = error
        } else {
            payload = error.data
        }

        yield put({
            type : 'CUSTOM_PRODUCT_ERROR',
            payload
        });
    }
}

function* addToCartTask(action) {
    //const { payload } = action;
    console.log(action.payload)
    yield put({
        type : 'ADD_TO_CART',
        payload: action.payload
    })
}

function* removeToCartTask(action) {
    //const { payload } = action;
    yield put({
        type : 'REMOVE_FROM_CART',
        payload: action.payload
    })
}

function* clearCartTask(action) {
	yield put({
		type: 'CLEAR_CART_LIST',
	});
}


function* productSaga() {
    yield takeLatest('GET_PRODUCT_LIST',fetchMenuTask);
    yield takeLatest('GET_DRINK_LIST', fetchDrinkTask);
    yield takeLatest('GET_SPECIAL_LIST', fetchSpecialTask);
    yield takeLatest('ADD_CART', addToCartTask);
    yield takeLatest('REMOVE_CART', removeToCartTask);
    yield takeLatest('CLEAR_CART', clearCartTask );
    yield takeLatest('CREATE_ORDER', createOrderTask);
    yield takeLatest('GET_VENDOR_LIST', fetchVendorTask);
    yield takeLatest('GET_ORDER_HISTORY', fetchHistoryTask);
    yield takeLatest('GET_CUSTOM_PRODUCT',fetchCustomProductTask);
}

export default productSaga;
