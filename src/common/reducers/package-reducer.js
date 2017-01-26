import actionTypes from '../actions/action-types';

const exampleState = {
	packageId: 'example',
	version: '0.0.1',
	activeView: 'details|dependencies|diff',
	detailsAreLoading: false,
	dependenciesAreLoading: false,
	historyIsLoading: false,
	details: null,
	dependencies: '{tree object}',
	history: '[array]'
};

function setPackage(oldState, action) {
	const newState = { ...oldState };
	newState.packageId = action.payload.packageId || newState.packageId;
	newState.version = action.payload.version || newState.packageId;
	newState.ts = action.payload.ts ? Number(action.payload.ts) : undefined;
	newState.rhsversion = action.payload.rhsversion || newState.rhsversion;
	newState.rhsts = action.payload.rhsts ? Number(action.payload.rhsts) : undefined;
	return newState;
}

function setActiveView(oldState, action) {
	const newState = { ...oldState };
	newState.activeView = action.payload.activeView;
	return newState;
}

function setDetailsAreLoading(oldState, action) {
	const newState = { ...oldState };
	newState.detailsAreLoading = action.payload.isLoading;
	return newState;
}

function setDiffIsLoading(oldState, action) {
	const newState = { ...oldState };
	newState.setDiffIsLoading = action.payload.isLoading;
	return newState;
}

function setDependenciesAreLoading(oldState, action) {
	const newState = { ...oldState };
	newState.dependenciesAreLoading = action.payload.isLoading;
	return newState;
}

function setDetails(oldState, action) {
	const newState = { ...oldState };
	newState.details = action.payload.details;
	return newState;
}

function setDiff(oldState, action) {
	const newState = { ...oldState };
	newState.diff = action.payload.diff;
	return newState;
}

function setDiffRhs(oldState, action) {
	const newState = { ...oldState };
	newState.rhsversion = action.payload.rhsversion;
	newState.rhsts = action.payload.rhsts;
	return newState;
}

function setDependencies(oldState, action) {
	const newState = { ...oldState };
	newState.dependencies = action.payload.dependencies;
	return newState;
}

export default function (state = {}, action) {
	switch (action.type) {
		case actionTypes.packages.SET_PACKAGE:
			return setPackage(state, action);
		case actionTypes.packages.SET_ACTIVE_VIEW:
			return setActiveView(state, action);
		case actionTypes.packages.SET_DETAILS_ARE_LOADING:
			return setDetailsAreLoading(state, action);
		case actionTypes.packages.SET_DIFF_IS_LOADING:
			return setDiffIsLoading(state, action);
		case actionTypes.packages.SET_DEPENDENCIES_ARE_LOADING:
			return setDependenciesAreLoading(state, action);
		case actionTypes.packages.SET_DETAILS:
			return setDetails(state, action);
		case actionTypes.packages.SET_DIFF:
			return setDiff(state, action);
		case actionTypes.packages.SET_DIFF_RHS:
			return setDiffRhs(state, action);
		case actionTypes.packages.SET_DEPENDENCIES:
			return setDependencies(state, action);
		default:
			return state;
	}
}
