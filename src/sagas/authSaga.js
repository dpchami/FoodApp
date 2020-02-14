import { call,put, takeLatest } from 'redux-saga/effects'
import Menu from '../services/apiCall'
import { setEmail,setLocation,setUserName,setMobile,setToken, setDistrict, setRegion } from "../store/local";

function* userLoginTask(action) {
    try{
        yield put({
            type: 'LOGIN_REQUEST_LOADING',
        });

        const { payload } = action;

        const res = yield call(Menu.doLogin,payload.username,payload.password);

        console.log(res);
        if (res.status === 200)
        {
            //save user information to local db
            const userData = res.data[0];
            const userAddress = res.data[1];

            //console.log(userData);
            //console.log(userAddress);

            setEmail(userData.email);
            setUserName(userData.username);
            setToken(userData.token);
            setMobile(userData.mobile);
            setLocation(userAddress.location);
            setDistrict(userAddress.district);
            setRegion(userAddress.region);

            yield put({
                type: 'LOGIN_REQUEST_SUCCESS',
             //   payload : res.data
            });
        } else {
            yield put({
                type: 'LOGIN_REQUEST_ERROR',
                payload: res.data
            });
        }

    } catch (e) {
        var payload;
        if ( typeof e === 'string'){
            payload = e;
        } else {
            payload = e.data;
        }
        yield put({
            type: 'LOGIN_REQUEST_ERROR',
            payload
        })
    }
}

function* userRegisterTask(action) 
 {
     try {
        yield put({
            type: 'REGISTER_REQUEST_LOADING',
        });

        const { payload } = action;

        const res = yield call(Menu.doRegister, payload.name, 
                    payload.mobile,payload.email,payload.password,
                    payload.district,payload.region,payload.location);

        if ( res.status === 200){
            setEmail(payload.email);
            setLocation(payload.location);
            setUserName(payload.name);
            setToken(res.data.token);
            setMobile(res.data.mobile);
            setDistrict(payload.district);
            setRegion(payload.region);

            yield put({
                type: 'REGISTER_REQUEST_SUCCESS',
                payload: res.data
            });
        } else {
            yield put({
                type: 'REGISTER_REQUEST_ERROR',
                payload: res.data
            })
        }
         
     } catch (error) {
         var payload;
         if (typeof error === "string"){
             payload = error
         } else {
             payload = error.data
         }

         yield put({
             type : 'REGISTER_REQUEST_ERROR',
             payload
         })
     }
 }


function* authSaga() {
    yield takeLatest('LOGIN_USER',userLoginTask),
    yield takeLatest('REGISTER_USER', userRegisterTask)
}

export default authSaga;