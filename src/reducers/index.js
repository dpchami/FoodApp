import { combineReducers } from 'redux';
//import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import  autoMergeLevel2  from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import dataReducer from './dataReducer';
import authReducer from './authReducer';

const dataPersistConfig = {
  key: 'data',
  storage: AsyncStorage,
  whitelist: ['productMessage'],
  stateReconciler: autoMergeLevel2,
};


const rootReducer = combineReducers({
  data: persistReducer(dataPersistConfig, dataReducer),
  auth: persistReducer(dataPersistConfig,authReducer),
});

export default rootReducer;