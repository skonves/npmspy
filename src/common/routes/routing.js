import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import NumberManager from '../components/NumberManager';
import ShortLink from '../components/ShortLink';
import Package from '../components/Package';
import PackageHistory from '../components/PackageHistory';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/home" component={Home} />
		<Route path="/numbers" components={NumberManager} />
		<Route path="/packages" components={Package} />
		<Route path="/packages/:versionId" components={Package} />
		<Route path="/packages/:versionId/history" components={PackageHistory} />
		<Route path="/links" components={ShortLink} >
		<Route path="/links/:value" components={ShortLink} />
		</Route>
	</Route>
);
