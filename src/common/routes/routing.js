import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import NumberManager from '../components/NumberManager';
import ShortLink from '../components/ShortLink';
import Package from '../components/Package';
import PackageHeader from '../components/PackageHeader';
import PackageDetails from '../components/PackageDetails';
import PackageDependencies from '../components/PackageDependencies';
import PackageDiff from '../components/PackageDiff';
import Search from '../components/Search';

import { fetchVersion, setActiveView, fetchDetails, fetchDependencies, fetchDiff } from '../actions/package-actions';
import { fetchSearchResults } from '../actions/search-actions';

export default (dispatch, getState) => {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="search" components={{ page: Search }} onEnter={initSearch} />
			<Route path="packages" components={{ pageHeader: PackageHeader, page: Package }} >
				<Route path=":versionId" component={PackageDetails} onEnter={initDetails} />
				<Route path=":versionId/dependencies" component={PackageDependencies} onEnter={initDependencies} />
				<Route path=":versionId/diff/:rhsversion" component={PackageDiff} onEnter={initDiff} />
			</Route>
		</Route>
	);

	// function initPackage(nextState, replace, callback) {
	// 	const state = getState().packageReducer;
	// 	console.log('initializing package');
	// 	if (!state.packageId ||
	// 		!state.version ||
	// 		`${state.packageId}@${state.version}` !== nextState.params.versionId
	// 	) {
	// 		const parts = nextState.params.versionId.split('@');
	// 		fetchVersion(parts[0], parts[1], nextState.location.query.ts, nextState.params.rhsversion, nextState.location.query.rhsts)(dispatch)
	// 			.then(() => {
	// 				callback();
	// 			})
	// 			.catch(reason => callback(reason));
	// 	} else {
	// 		callback();
	// 	}
	// }

	function initDetails(nextState, replace, callback) {
		const state = getState().packageReducer;
		console.log('initializing details');
		dispatch(setActiveView('details'));

		const stateTs = Number(state.ts) || undefined;
		const routeTs = Number(nextState.location.query.ts) || undefined;

		const parts = nextState.params.versionId.split('@');
		fetchDetails(parts[0], parts[1], nextState.location.query.ts)(dispatch)
			.then(() =>
				callback()
			)
			.catch(reason => callback(reason));
	}

	function initDependencies(nextState, replace, callback) {
		const state = getState().packageReducer;
		console.log('initializing dependencies');
		dispatch(setActiveView('dependencies'));

		const stateTs = Number(state.ts) || undefined;
		const routeTs = Number(nextState.location.query.ts) || undefined;

		if (!state.packageId ||
			!state.version ||
			`${state.packageId}@${state.version}` !== nextState.params.versionId ||
			stateTs !== routeTs
		) {
			const parts = nextState.params.versionId.split('@');
			fetchDependencies(parts[0], parts[1], nextState.location.query.ts)(dispatch)
				.then(() =>
					callback()
				)
				.catch(reason => callback(reason));
		} else {
			callback();
		}

	}

	function initDiff(nextState, replace, callback) {
		const state = getState().packageReducer;
		console.log('initializing diff');
		dispatch(setActiveView('diff'));

		const stateTs = Number(state.ts) || undefined;
		const routeTs = Number(nextState.location.query.ts) || undefined;

		const parts = nextState.params.versionId.split('@');

		const oldState = {
			packageId: state.packageId,
			version: state.version,
			ts: state.ts,
			rhsversion: state.rhsversion,
			rhsts: state.rhsts
		};

		const newState = {
			packageId: parts[0],
			version: parts[1],
			ts: nextState.location.query.ts,
			rhsversion: nextState.params.rhsversion,
			rhsts: nextState.location.query.rhsts
		};

		console.log(oldState);
		console.log(newState);

		if (parts[0] !== state.packageId ||
			parts[1] !== state.version ||
			nextState.location.query.ts != state.ts ||
			nextState.params.rhsversion !== state.rhsversion //||
			//nextState.location.query.rhsts != state.rhsts
		) {
			fetchDiff(parts[0], parts[1], nextState.location.query.ts, nextState.params.rhsversion, nextState.location.query.rhsts)(dispatch)
				.then(() =>
					callback()
				)
				.catch(reason => callback(reason));
		} else {
			callback();
		}
	}

	function initSearch(nextState, replace, callback) {
		const state = getState().searchReducer;
		console.log('initializing search');

		if (nextState.location.query.q !== state.query) {
			fetchSearchResults(nextState.location.query.q)(dispatch)
				.then(() => callback())
				.catch(reason => callback(reason));
		} else {
			callback();
		}
	}
};

