import { getRepository } from '../utils/repository';
import actionTypes from './action-types';
import operations from '../constants/operations';

export function setIsLoading(isLoading) {
	return {
		type: actionTypes.history.SET_IS_LOADING,
		payload: { isLoading }
	};
}

export function appendHistory(historyItems) {
	return {
		type: actionTypes.history.APPEND_HISTORY,
		payload: { historyItems }
	};
}

export function fetchLatestHistory(packageId, version, before) {
	return dispatch => {
		dispatch(setIsLoading(true));

		return getRepository()
			.packages(operations.packages.GET_HISTORY, { packageId, version, before })
			.then(value => {
				dispatch(appendHistory(value.history));
				dispatch(setIsLoading(false));
			})
			.catch(reason => {
				dispatch(setIsLoading(false));
			});
	};
}

export function fetchNextHistory(packageId, version) {
	return (dispatch, getState) => {

		var min = Math.min(getState().historyReducer.history.map(h => h.ts));

		dispatch(setIsLoading(true));

		return getRepository()
			.packages(operations.packages.GET_HISTORY, { packageId, version, before: min })
			.then(value => {
				dispatch(appendHistory(value.history));
				dispatch(setIsLoading(false));
			})
			.catch(reason => {
				dispatch(setIsLoading(false));
			});
	};
}
