import actionTypes from '../actions/action-types';

function setTreeIsActive(oldState, action) {
	const newState = { ...oldState };
	newState.treeIsActive = action.payload.isActive;
	newState.historyIsActive = !action.payload.isActive;
	return newState;
}

function setHistoryIsActive(oldState, action) {
	const newState = { ...oldState };
	newState.historyIsActive = action.payload.isActive;
	newState.treeIsActive = !action.payload.isActive;
	return newState;
}

function setTreeIsLoading(oldState, action) {
	const newState = { ...oldState };
	newState.treeIsLoading = action.payload.isLoading;
	return newState;
}

function setHistoryIsLoading(oldState, action) {
	const newState = { ...oldState };
	newState.historyIsLoading = action.payload.isLoading;
	return newState;
}

function setTree(oldState, action) {
	const newState = { ...oldState };
	newState.tree = action.payload.tree;
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

export default function (state = { treeIsActive: true }, action) {
	switch (action.type) {
		case actionTypes.packages.SET_TREE_IS_ACTIVE:
			return setTreeIsActive(state, action);
		case actionTypes.packages.SET_HISTORY_IS_ACTIVE:
			return setHistoryIsActive(state, action);
		case actionTypes.packages.SET_TREE_IS_LOADING:
			return setTreeIsLoading(state, action);
		case actionTypes.packages.SET_HISTORY_IS_LOADING:
			return setHistoryIsLoading(state, action);
		case actionTypes.packages.SET_VERSION_TREE:
			return setTree(state, action);
		case actionTypes.packages.APPEND_VERSION_HISTORY:
			return appendHistory(state, action);
		default:
			return state;
	}
}
