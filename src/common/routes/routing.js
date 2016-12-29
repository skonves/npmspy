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
import PackageHistory from '../components/PackageHistory';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="packages" components={{ pageHeader: PackageHeader, page: Package }}>
			<Route path=":versionId" component={PackageDetails} />
			<Route path=":versionId/dependencies" component={PackageDependencies} />
			<Route path=":versionId/history" component={PackageHistory} />
		</Route>
	</Route>
);
