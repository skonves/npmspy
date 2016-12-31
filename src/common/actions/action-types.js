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
	packages: {
		SET_PACKAGE: 'SET_PACKAGE',
		SET_ACTIVE_VIEW: 'SET_ACTIVE_VIEW',
		SET_DETAILS_ARE_LOADING: 'SET_DETAILS_ARE_LOADING',
		SET_DEPENDENCIES_ARE_LOADING: 'SET_DEPENDENCIES_ARE_LOADING',
		SET_HISTORY_IS_LOADING: 'SET_HISTORY_IS_LOADING',
		SET_DETAILS: 'SET_DETAILS',
		SET_DEPENDENCIES: 'SET_DEPENDENCIES',
		APPEND_HISTORY: 'APPEND_HISTORY'
		// SET_VIEW: 'SET_VIEW',
		// SET_TREE_IS_LOADING: 'SET_TREE_IS_LOADING',
		// SET_HISTORY_IS_LOADING: 'SET_HISTORY_IS_LOADING',
		// SET_VERSION_TREE: 'SET_VERSION_TREE',
		// APPEND_VERSION_HISTORY: 'APPEND_VERSION_HISTORY',
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
