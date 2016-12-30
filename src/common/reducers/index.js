import { combineReducers } from 'redux';
import auth from './auth';
import linkReducer from './linkReducer';
import numberReducer from './numberReducer';
import packageReducer from './package-reducer';
import historyReducer from './history-reducer';
import searchReducer from './search-reducer';

export default combineReducers({
	auth,
	linkReducer,
	numberReducer,
	packageReducer,
	historyReducer,
	searchReducer
});
