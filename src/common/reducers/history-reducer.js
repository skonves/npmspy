import actionTypes from '../actions/action-types';

function setIsLoading(oldState, action) {
	const newState = { ...oldState };
	newState.isLoading = action.payload.isLoading;
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
		case actionTypes.history.SET_IS_LOADING:
			return setIsLoading(state, action);
		case actionTypes.history.APPEND_HISTORY:
			return appendHistory(state, action);
		default:
			return state;
	}
}
