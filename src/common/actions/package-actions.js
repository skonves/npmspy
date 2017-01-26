
import { getRepository } from '../utils/repository';
import actionTypes from './action-types';
import operations from '../constants/operations';
import { browserHistory } from 'react-router';

export function setPackage(packageId, version, ts, rhsversion, rhsts) {
	return {
		type: actionTypes.packages.SET_PACKAGE,
		payload: { packageId, version, ts, rhsversion: rhsversion || version, rhsts: rhsts || ts }
	};
}

export function setActiveView(activeView) {
	const newActiveView = activeView === 'dependencies' || activeView === 'diff' ? activeView : 'details';
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

export function setDiffIsLoading(isLoading) {
	return {
		type: actionTypes.packages.SET_DIFF_IS_LOADING,
		payload: { isLoading }
	};
}

export function setDetails(details) {
	return {
		type: actionTypes.packages.SET_DETAILS,
		payload: { details }
	};
}

export function setDiff(diff) {
	return {
		type: actionTypes.packages.SET_DIFF,
		payload: { diff }
	};
}

export function setDiffRhs(rhsversion, rhsts) {
	return {
		type: actionTypes.packages.SET_DIFF_RHS,
		payload: { rhsversion, rhsts }
	};
}

export function setDependencies(dependencies) {
	return {
		type: actionTypes.packages.SET_DEPENDENCIES,
		payload: { dependencies }
	};
}

export function fetchDiff(packageId, version, ts, rhsversion, rhsts) {
	return dispatch => {
		return getRepository()
			.packages(operations.packages.GET_DIFF, { packageId, version, ts, rhsversion, rhsts })
			.then(value => {
				dispatch(setDependencies(value.dependencies));
				dispatch(setDependenciesAreLoading(false));
				dispatch(setDiffRhs(rhsversion, rhsts));
			})
			.catch(reason => {
				dispatch(setDependenciesAreLoading(false));
			});
	};
}

export function fetchVersion(packageId, version, ts, rhsversion, rhsts) {
	return dispatch => {
		dispatch(setPackage(packageId, version, ts, rhsversion, rhsts));
		// TODO: load package details
		dispatch(setDetails({ message: 'TODO' }));
		dispatch(setDependenciesAreLoading(true));
		dispatch(setDiffIsLoading(true));

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
				.packages(operations.packages.GET_DIFF, { packageId, version, ts, rhsversion, rhsts })
				.then(value => {
					dispatch(setDiff(value));
					dispatch(setDiffIsLoading(false));
				})
				.catch(reason => {
					dispatch(setDiffIsLoading(false));
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
