// export default {
// 	LOGIN_REQUEST: 'LOGIN_REQUEST',
// 	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
// 	LOGIN_FAILED: 'LOGIN_FAILED',
// 	LOGOUT_REQUEST: 'LOGOUT_REQUEST',
// 	LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
// 	LOGOUT_FAILED: 'LOGOUT_FAILED'
// };


export default {
	login: {
		LOGIN_REQUEST: 'LOGIN_REQUEST',
		LOGIN_SUCCESS: 'LOGIN_SUCCESS',
		LOGIN_FAILED: 'LOGIN_FAILED',
		LOGOUT_REQUEST: 'LOGOUT_REQUEST',
		LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
		LOGOUT_FAILED: 'LOGOUT_FAILED'
	},
	diff: {
		SET_IS_LOADING: 'SET_IS_LOADING',
		SET_PACKAGE_META: 'SET_PACKAGE_META',
		SET_LHS_META: 'SET_LHS_META',
		SET_RHS_META: 'SET_RHS_META',
		SET_PACKAGE_VERSIONS: 'SET_PACKAGE_VERSIONS',
		SET_DIFF: 'SET_DIFF',
	},
	packages: {
		SET_PACKAGE: 'SET_PACKAGE',
		SET_ACTIVE_VIEW: 'SET_ACTIVE_VIEW',
		SET_DETAILS_ARE_LOADING: 'SET_DETAILS_ARE_LOADING',
		SET_DIFF_IS_LOADING: 'SET_DIFF_IS_LOADING',
		SET_DEPENDENCIES_ARE_LOADING: 'SET_DEPENDENCIES_ARE_LOADING',
		SET_DETAILS: 'SET_DETAILS',
		SET_DIFF: 'SET_DIFF',
		SET_DIFF_RHS: 'SET_DIFF_RHS',
		SET_DEPENDENCIES: 'SET_DEPENDENCIES'
	},
	history: {
		SET_IS_LOADING: 'SET_IS_LOADING',
		APPEND_HISTORY: 'APPEND_HISTORY'
	},
	search: {
		SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
		SET_IS_LOADING: 'SET_IS_LOADING',
		SET_CURRENT_QUERY: 'SET_CURRENT_QUERY'
	}
};
