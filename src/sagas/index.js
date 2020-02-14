import { fork } from 'redux-saga/effects';
import productSaga from './productSaga'
import authSaga from './authSaga';

function* rootSaga() {
    yield fork(productSaga);
    yield fork(authSaga);
}

export default rootSaga;