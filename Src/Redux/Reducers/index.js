import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import HomeReducer from './HomeReducer';


const rootReducers = combineReducers({AuthReducer: AuthReducer, HomeReducer: HomeReducer });


export default rootReducers