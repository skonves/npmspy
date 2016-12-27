
import { getRepository } from '../utils/repository';
import actionTypes from './action-types';
import operations from '../constants/operations';

export function setTreeIsLoading(isLoading) {
	return {
		type: actionTypes.packages.SET_TREE_IS_LOADING,
		payload: { isLoading }
	};
}

export function setHistoryIsLoading(isLoading) {
	return {
		type: actionTypes.packages.SET_HISTORY_IS_LOADING,
		payload: { isLoading }
	};
}

export function setTreeIsActive(isActive) {
	return {
		type: actionTypes.packages.SET_TREE_IS_ACTIVE,
		payload: { isActive }
	};
}

export function setHistoryIsActive(isActive) {
	return {
		type: actionTypes.packages.SET_HISTORY_IS_ACTIVE,
		payload: { isActive }
	};
}

export function setVersionTree(tree) {
	return {
		type: actionTypes.packages.SET_VERSION_TREE,
		payload: { tree }
	};
}

export function appendVersionHistory(historyItems) {
	return {
		type: actionTypes.packages.APPEND_VERSION_HISTORY,
		payload: { historyItems }
	};
}

export function fetchVersionTree(packageId, version, ts) {
	return dispatch => {
		dispatch(setTreeIsLoading(true));

		return getRepository()
			.packages(operations.packages.GET_DEPENDENCIES, { packageId, version, ts })
			.then(value => {
				dispatch(setVersionTree(value));
				dispatch(setTreeIsLoading(false));
			})
			.catch(reason => {
				dispatch(setTreeIsLoading(false));
			});
	};
}

export function fetchVersionHistory(packageId, version, before) {
	return dispatch => {
		dispatch(setHistoryIsLoading(true));

		return getRepository()
			.packages(operations.packages.GET_HISTORY, { packageId, version, before })
			.then(value => {
				dispatch(appendVersionHistory(value.history));
				dispatch(setHistoryIsLoading(false));
			})
			.catch(reason => {
				dispatch(setHistoryIsLoading(false));
			});
	};
}
