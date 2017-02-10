import actionTypes from '../actions/action-types';

function setIsLoading(oldState, action) {
	const newState = { ...oldState };
	newState.isLoading = action.payload;
	return newState;
}

export default function (state = {}, action) {
	switch (action.type) {
		case actionTypes.diff.IS_LOADING:
			return setIsLoading(state, action);
	}
}
