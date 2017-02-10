import { assert } from 'chai';
import diffReducer from '../../src/common/reducers/diff-reducer';
import actionTypes from '../../src/common/actions/action-types';

describe('Diff Reducer', function () {
	it('sets isLoading', () => {
		// ARRANGE
		const action = {
			type: actionTypes.diff.IS_LOADING,
			payload: true
		};

		const state = {
			isLoading: false
		};

		const expectedState = {
			isLoading: true
		};

		// ACT
		const result = diffReducer(state, action);

		// ASSERT
		assert.deepEqual(result, expectedState);
	});
});
