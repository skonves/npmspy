import actionTypes from '../actions/action-types';

function setSearchResults(oldState, action) {
	const newState = { ...oldState };
	newState.searchResults = action.payload.searchResults;
	return newState;
}

function setIsLoading(oldState, action) {
	const newState = { ...oldState };
	newState.isLoading = action.payload.isLoading;
	return newState;
}

function setCurrentQuery(oldState, action) {
	const newState = { ...oldState };
	newState.query = action.payload.query;
	return newState;
}

export default function (state = {}, action) {
	switch (action.type) {
		case actionTypes.search.SET_SEARCH_RESULTS:
			return setSearchResults(state, action);
		case actionTypes.search.SET_IS_LOADING:
			return setIsLoading(state, action);
		case actionTypes.search.SET_CURRENT_QUERY:
			return setCurrentQuery(state, action);
		default:
			return state;
	}
}
