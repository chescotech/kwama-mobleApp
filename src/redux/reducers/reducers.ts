import {combineReducers} from 'redux';
import authReducer from './auth/reducer';

/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const rootReducers = combineReducers({
  auth: authReducer,
});

export default rootReducers;