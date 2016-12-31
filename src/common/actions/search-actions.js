import { getRepository } from '../utils/repository';
import actionTypes from './action-types';
import operations from '../constants/operations';

export function setSearchResults(searchResults) {
	return {
		type: actionTypes.search.SET_SEARCH_RESULTS,
		payload: { searchResults }
	};
}

export function setIsLoading(isLoading) {
	return {
		type: actionTypes.search.SET_IS_LOADING,
		payload: { isLoading }
	};
}

export function setCurrentQuery(query) {
	return {
		type: actionTypes.search.SET_CURRENT_QUERY,
		payload: { query }
	};
}

export function fetchSearchResults(query) {
	return dispatch => {
		dispatch(setIsLoading(true));
		dispatch(setCurrentQuery(query));

		return getRepository()
			.packages(operations.packages.SEARCH, { query })
			.then(value => {
				dispatch(setSearchResults(value.packages));
				dispatch(setIsLoading(false));
			})
			.catch(reason => {
				dispatch(setIsLoading(false));
			});
	};
}
