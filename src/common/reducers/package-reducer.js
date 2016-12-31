import actionTypes from '../actions/action-types';

const exampleState = {
	packageId: 'example',
	version: '0.0.1',
	activeView: 'details|dependencies|history',
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

function setDependenciesAreLoading(oldState, action) {
	const newState = { ...oldState };
	newState.dependenciesAreLoading = action.payload.isLoading;
	return newState;
}

function setHistoryIsLoading(oldState, action) {
	const newState = { ...oldState };
	newState.historyIsLoading = action.payload.isLoading;
	return newState;
}

function setDetails(oldState, action) {
	const newState = { ...oldState };
	newState.details = action.payload.details;
	return newState;
}

function setDependencies(oldState, action) {
	const newState = { ...oldState };
	newState.dependencies = action.payload.dependencies;
	return newState;
}

function setHistory(oldState, action) {
	const newState = { ...oldState };
	newState.history = action.payload.historyItems.sort((a, b) => b.ts - a.ts);
	return newState;
}

function appendHistory(oldState, action) {
	const newState = { ...oldState };
	let history = newState.history || [];
	action.payload.historyItems.forEach(item => history.push(item));

	// TODO: remove potential duplicate ts values
	newState.history = history.sort((a, b) => b.ts - a.ts);
	return newState;
}

export default function (state = { }, action) {
	switch (action.type) {
		case actionTypes.packages.SET_PACKAGE:
			return setPackage(state, action);
		case actionTypes.packages.SET_ACTIVE_VIEW:
			return setActiveView(state, action);
		case actionTypes.packages.SET_DETAILS_ARE_LOADING:
			return setDetailsAreLoading(state, action);
		case actionTypes.packages.SET_DEPENDENCIES_ARE_LOADING:
			return setDependenciesAreLoading(state, action);
		case actionTypes.packages.SET_HISTORY_IS_LOADING:
			return setHistoryIsLoading(state, action);
		case actionTypes.packages.SET_DETAILS:
			return setDetails(state, action);
		case actionTypes.packages.SET_DEPENDENCIES:
			return setDependencies(state, action);
		case actionTypes.packages.SET_HISTORY:
			return setHistory(state, action);
		case actionTypes.packages.APPEND_HISTORY:
			return appendHistory(state, action);
		default:
			return state;
	}
}
