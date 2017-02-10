import actionTypes from '../actions/action-types';

function setIsLoading(oldState, action) {
	const newState = { ...oldState };
	newState.isLoading = action.payload;
	return newState;
}

function setPackageMeta(oldState, action) {
	const newState = { ...oldState };

	const payload = action.payload || {};

	newState.packageId = payload.packageId;
	newState.lhsVersion = payload.lhsVersion;
	newState.lhsTs = payload.lhsTs;
	newState.rhsVersion = payload.rhsVersion;
	newState.rhsTs = payload.rhsTs;

	if (typeof (payload.lhsTs) == 'undefined') {
		delete newState.lhsTs;
	}

	if (typeof (payload.rhsTs) == 'undefined') {
		delete newState.rhsTs;
	}

	if (oldState.packageId !== newState.packageId) {
		delete newState.packageVersions;
		delete newState.lhs;
		delete newState.rhs;
	} else if (
		oldState.lhsVersion !== newState.lhsVersion
		|| oldState.lhsTs !== newState.lhsTs
		|| oldState.rhsVersion !== newState.rhsVersion
		|| oldState.rhsTs !== newState.rhsTs
	) {
		delete newState.lhs;
		delete newState.rhs;
	}

	return newState;
}

function setLhsMeta(oldState, action) {
	const newState = { ...oldState };

	const payload = action.payload || {};

	newState.lhsVersion = payload.version;
	newState.lhsTs = payload.ts;

	if (typeof (payload.ts) == 'undefined') {
		delete newState.lhsTs;
	}

	if (oldState.lhsVersion !== newState.lhsVersion || oldState.lhsTs !== newState.lhsTs) {
		delete newState.lhs;
		delete newState.rhs;
	}

	return newState;
}

function setRhsMeta(oldState, action) {
	const newState = { ...oldState };

	const payload = action.payload || {};

	newState.rhsVersion = payload.version;
	newState.rhsTs = payload.ts;

	if (typeof (payload.ts) == 'undefined') {
		delete newState.rhsTs;
	}

	if (oldState.rhsVersion !== newState.rhsVersion || oldState.rhsTs !== newState.rhsTs) {
		delete newState.lhs;
		delete newState.rhs;
	}

	return newState;
}

function setPackageVersions(oldState, action) {
	const newState = { ...oldState };

	const payload = action.payload || {};

	newState.packageVersions = payload.packageVersions;

	if (typeof (payload.packageVersions) == 'undefined') {
		delete newState.packageVersions;
	}

	return newState;
}

function setDiff(oldState, action) {
	const newState = { ...oldState };

	const payload = action.payload || {};

	newState.lhs = payload.lhs;
	newState.rhs = payload.rhs;

	if (typeof (payload.lhs) == 'undefined' || typeof (payload.rhs) == 'undefined') {
		delete payload.lhs;
		delete payload.rhs;
	}

	return newState;
}

export default function (state = {}, action) {
	switch (action.type) {
		case actionTypes.diff.SET_IS_LOADING:
			return setIsLoading(state, action);
		case actionTypes.diff.SET_PACKAGE_META:
			return setPackageMeta(state, action);
		case actionTypes.diff.SET_LHS_META:
			return setLhsMeta(state, action);
		case actionTypes.diff.SET_RHS_META:
			return setRhsMeta(state, action);
		case actionTypes.diff.SET_PACKAGE_VERSIONS:
			return setPackageVersions(state, action);
		case actionTypes.diff.SET_DIFF:
			return setDiff(state, action);
		default:
			return state;
	}
}
