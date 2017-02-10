import { assert } from 'chai';
import diffReducer from '../../src/common/reducers/diff-reducer';
import actionTypes from '../../src/common/actions/action-types';

describe('Diff Reducer', function () {
	describe('SET_IS_LOADING', () => {
		it('true', () => {
			// ARRANGE
			const action = {
				type: actionTypes.diff.SET_IS_LOADING,
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

	describe('SET_PACKAGE_META', () => {
		it('with ts', () => {
			// ARRANGE
			const action = {
				type: actionTypes.diff.SET_PACKAGE_META,
				payload: {
					packageId: 'asdf',
					lhsVersion: '1.2.3',
					lhsTs: 1337,
					rhsVersion: '2.3.4',
					rhsTs: 31337,
				}
			};

			const state = {
				packageId: 'xxx',
				lhsVersion: '9.9.9',
				lhsTs: 9999,
				rhsVersion: '9.9.9',
				rhsTs: 9999,
				packageVersions: ['thing'],
				lhs: { key: 'value' },
				rhs: { key: 'value' }
			};

			const expectedState = {
				packageId: 'asdf',
				lhsVersion: '1.2.3',
				lhsTs: 1337,
				rhsVersion: '2.3.4',
				rhsTs: 31337,
			};

			// ACT
			const result = diffReducer(state, action);

			// ASSERT
			assert.deepEqual(result, expectedState);
		});
		it('without ts', () => {
			// ARRANGE
			const action = {
				type: actionTypes.diff.SET_PACKAGE_META,
				payload: {
					packageId: 'asdf',
					lhsVersion: '1.2.3',
					rhsVersion: '2.3.4',
				}
			};

			const state = {
				packageId: 'xxx',
				lhsVersion: '9.9.9',
				lhsTs: 9999,
				rhsVersion: '9.9.9',
				rhsTs: 9999,
				packageVersions: ['thing'],
				lhs: { key: 'value' },
				rhs: { key: 'value' }
			};

			const expectedState = {
				packageId: 'asdf',
				lhsVersion: '1.2.3',
				rhsVersion: '2.3.4',
			};

			// ACT
			const result = diffReducer(state, action);

			// ASSERT
			assert.deepEqual(result, expectedState);
		});
		it('same packageId', () => {
			// ARRANGE
			const action = {
				type: actionTypes.diff.SET_PACKAGE_META,
				payload: {
					packageId: 'asdf',
					lhsVersion: '1.2.3',
					lhsTs: 1337,
					rhsVersion: '2.3.4',
					rhsTs: 31337,
				}
			};

			const state = {
				packageId: 'asdf',
				lhsVersion: '9.9.9',
				lhsTs: 9999,
				rhsVersion: '9.9.9',
				rhsTs: 9999,
				packageVersions: ['thing'],
				lhs: { key: 'value' },
				rhs: { key: 'value' }
			};

			const expectedState = {
				packageId: 'asdf',
				lhsVersion: '1.2.3',
				lhsTs: 1337,
				rhsVersion: '2.3.4',
				rhsTs: 31337,
				packageVersions: ['thing'],
			};

			// ACT
			const result = diffReducer(state, action);

			// ASSERT
			assert.deepEqual(result, expectedState);
		});
	});

	describe('SET_LHS_META', () => {
		it('with ts', () => {
			// ARRANGE
			const action = {
				type: actionTypes.diff.SET_LHS_META,
				payload: {
					version: '1.2.3',
					ts: 1337,
				}
			};

			const state = {
				packageId: 'xxx',
				lhsVersion: '9.9.9',
				lhsTs: 9999,
				rhsVersion: '9.9.9',
				rhsTs: 9999,
				packageVersions: ['thing'],
				lhs: { key: 'value' },
				rhs: { key: 'value' }
			};

			const expectedState = {
				packageId: 'xxx',
				lhsVersion: '1.2.3',
				lhsTs: 1337,
				rhsVersion: '9.9.9',
				rhsTs: 9999,
				packageVersions: ['thing'],
			};

			// ACT
			const result = diffReducer(state, action);

			// ASSERT
			assert.deepEqual(result, expectedState);
		});
		it('without ts', () => {
			// ARRANGE
			const action = {
				type: actionTypes.diff.SET_LHS_META,
				payload: {
					version: '1.2.3'
				}
			};

			const state = {
				packageId: 'xxx',
				lhsVersion: '9.9.9',
				lhsTs: 9999,
				rhsVersion: '9.9.9',
				rhsTs: 9999,
				packageVersions: ['thing'],
				lhs: { key: 'value' },
				rhs: { key: 'value' }
			};

			const expectedState = {
				packageId: 'xxx',
				lhsVersion: '1.2.3',
				rhsVersion: '9.9.9',
				rhsTs: 9999,
				packageVersions: ['thing'],
			};

			// ACT
			const result = diffReducer(state, action);

			// ASSERT
			assert.deepEqual(result, expectedState);
		});
	});

	describe('SET_RHS_META', () => {
		it('with ts', () => {
			// ARRANGE
			const action = {
				type: actionTypes.diff.SET_RHS_META,
				payload: {
					version: '1.2.3',
					ts: 1337,
				}
			};

			const state = {
				packageId: 'xxx',
				lhsVersion: '9.9.9',
				lhsTs: 9999,
				rhsVersion: '9.9.9',
				rhsTs: 9999,
				packageVersions: ['thing'],
				lhs: { key: 'value' },
				rhs: { key: 'value' }
			};

			const expectedState = {
				packageId: 'xxx',
				lhsVersion: '9.9.9',
				lhsTs: 9999,
				rhsVersion: '1.2.3',
				rhsTs: 1337,
				packageVersions: ['thing'],
			};

			// ACT
			const result = diffReducer(state, action);

			// ASSERT
			assert.deepEqual(result, expectedState);
		});
		it('without ts', () => {
			// ARRANGE
			const action = {
				type: actionTypes.diff.SET_RHS_META,
				payload: {
					version: '1.2.3'
				}
			};

			const state = {
				packageId: 'xxx',
				lhsVersion: '9.9.9',
				lhsTs: 9999,
				rhsVersion: '9.9.9',
				rhsTs: 9999,
				packageVersions: ['thing'],
				lhs: { key: 'value' },
				rhs: { key: 'value' }
			};

			const expectedState = {
				packageId: 'xxx',
				lhsVersion: '9.9.9',
				lhsTs: 9999,
				rhsVersion: '1.2.3',
				packageVersions: ['thing'],
			};

			// ACT
			const result = diffReducer(state, action);

			// ASSERT
			assert.deepEqual(result, expectedState);
		});
	});
});
