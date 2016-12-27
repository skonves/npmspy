import { combineReducers } from 'redux';
import auth from './auth';
import linkReducer from './linkReducer';
import numberReducer from './numberReducer';
import packageReducer from './package-reducer';

export default combineReducers({
	auth,
	linkReducer,
	numberReducer,
	packageReducer
});
