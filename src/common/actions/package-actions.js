
import { getRepository } from '../utils/repository';
import actionTypes from './action-types';
import operations from '../constants/operations';
import { browserHistory } from 'react-router';

export function setPackage(packageId, version, ts) {
	return {
		type: actionTypes.packages.SET_PACKAGE,
		payload: { packageId, version, ts }
	};
}

export function setActiveView(activeView) {
	const newActiveView = activeView === 'dependencies' || activeView === 'history' ? activeView : 'details';
	return {
		type: actionTypes.packages.SET_ACTIVE_VIEW,
		payload: { activeView: newActiveView }
	};
}

export function setDetailsAreLoading(isLoading) {
	return {
		type: actionTypes.packages.SET_DETAILS_ARE_LOADING,
		payload: { isLoading }
	};
}

export function setDependenciesAreLoading(isLoading) {
	return {
		type: actionTypes.packages.SET_DEPENDENCIES_ARE_LOADING,
		payload: { isLoading }
	};
}

export function setHistoryIsLoading(isLoading) {
	return {
		type: actionTypes.packages.SET_HISTORY_IS_LOADING,
		payload: { isLoading }
	};
}

export function setDetails(details) {
	return {
		type: actionTypes.packages.SET_DETAILS,
		payload: { details }
	};
}

export function setDependencies(dependencies) {
	return {
		type: actionTypes.packages.SET_DEPENDENCIES,
		payload: { dependencies }
	};
}

export function setHistory(historyItems) {
	return {
		type: actionTypes.packages.SET_HISTORY,
		payload: { historyItems }
	};
}

export function appendHistory(historyItems) {
	return {
		type: actionTypes.packages.APPEND_HISTORY,
		payload: { historyItems }
	};
}

export function navigateToView(viewName) {
	return (dispatch, getState) => {

		const state = getState().packageReducer;
		viewName = viewName === 'dependencies' || viewName === 'history' ? '/' + viewName : '';

		dispatch(setActiveView(viewName));

		return new Promise(resolve => {
			browserHistory.push(`/packages/${state.packageId}@${state.version}${viewName}`);
		});
	};
}

export function fetchVersion(packageId, version, ts) {
	return dispatch => {
		dispatch(setPackage(packageId, version, ts));
		// TODO: load package details
		dispatch(setDetails({ message: 'TODO' }));
		dispatch(setDependenciesAreLoading(true));
		dispatch(setHistoryIsLoading(true));

		return Promise.all([
			// TODO: load package details
			getRepository()
				.packages(operations.packages.GET_DEPENDENCIES, { packageId, version, ts })
				.then(value => {
					dispatch(setDependencies(value.dependencies));
					dispatch(setDependenciesAreLoading(false));
				})
				.catch(reason => {
					dispatch(setDependenciesAreLoading(false));
				}),
			getRepository()
				.packages(operations.packages.GET_HISTORY, { packageId, version })
				.then(value => {
					dispatch(setHistory(value.history));
					dispatch(setHistoryIsLoading(false));
				})
				.catch(reason => {
					dispatch(setHistoryIsLoading(false));
				})
		]);
	};
}

export function fetchDependencies(packageId, version, ts) {
	return dispatch => {
		setPackage(packageId, version, ts);
		dispatch(setPackage(packageId, version, ts));
		// TODO: load package details
		dispatch(setDependenciesAreLoading(true));

		return getRepository()
			.packages(operations.packages.GET_DEPENDENCIES, { packageId, version, ts })
			.then(value => {
				dispatch(setDependencies(value.dependencies));
				dispatch(setDependenciesAreLoading(false));
			})
			.catch(reason => {
				dispatch(setDependenciesAreLoading(false));
			});
	};
}
