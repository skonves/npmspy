import { getRepository } from '../utils/repository';
import actionTypes from './action-types';
import operations from '../constants/operations';

export function setSearchResults(searchResults) {

	console.log('@ action (set): ' + JSON.stringify(searchResults));

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

export function fetchSearchResults(query) {
	return dispatch => {
		dispatch(setIsLoading(true));

		return getRepository()
			.packages(operations.packages.SEARCH, { query })
			.then(value => {
				console.log('@ action (fetch): ' + JSON.stringify(value));
				dispatch(setSearchResults(value.packages));
				dispatch(setIsLoading(false));
			})
			.catch(reason => {
				dispatch(setIsLoading(false));
			});
	};
}
