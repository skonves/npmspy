import fs from 'fs';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { Router, RouterContext, match } from 'react-router';
import routes from '../common/routes/routing';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import combinedReducers from '../common/reducers';

import thunk from 'redux-thunk';

import fetchComponentData from '../common/utils/fetchComponentData';

import { createRepository } from '../common/utils/repository';
import authStrategy from './strategies/auth';
import numberStrategy from './strategies/numbers';
import packageStrategy from './strategies/packages';

import cookieParser from 'cookie-parser';

import * as packageActions from '../common/actions/package-actions';
import * as searchActions from '../common/actions/search-actions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green100, green500, green700 } from 'material-ui/styles/colors';

// I don't think we need auth for this project
// import { authMiddleware } from './auth';
// console.log(authMiddleware);

createRepository({
	auth: authStrategy,
	numbers: numberStrategy,
	packages: packageStrategy
});

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

// app.use(authMiddleware({
// 	allowAnon: ['/api/login', '/', '/assets.*', '/dist.*'],
// 	requireCsrfToken: ['/api/.*']
// }));

app.use('/assets', express.static(path.join(__dirname, '../client/assets')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

import api from './api';
app.use('/api', api);

// server rendering
app.use((req, res, next) => {

	let initialState = {};

	if (req.user) {
		console.log('logged in already');

		initialState.auth = {
			isLoggingIn: false,
			isLoggingOut: false,
			isAuthenticated: true,
			username: req.user.username,
			avatarUri: req.user.avatarUri
		};
	}

	const store = createStore(combinedReducers, initialState, applyMiddleware(thunk));

	const routeProvider = routes(store.dispatch, store.getState);

	// react-router
	match({ routes: routeProvider, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			return res.status(500).send(error.message);
		}

		if (redirectLocation) {
			return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		}

		if (renderProps == null) {
			// return next('err msg: route not found'); // yield control to next middleware to handle the request
			return res.status(404).send('Not found');
		}

		Promise.all([]).then(() => {
			const initView = renderToString((
				<Provider store={store}>
					<RouterContext {...renderProps} />
				</Provider>
			));

			let state = JSON.stringify(store.getState());

			let page = renderFullPage(initView, state);

			return page;
		})

		.then(page => res.status(200).send(page))

		.catch(err => res.end(err.message));
	});
});

function renderFullPage(html, initialState) {
	return `
	<!doctype html>
	<html lang="utf-8">
	  <head>
		<title>Universal Redux Example</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" type="image/png" href="assets/images/react.png">
		<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
		<link href="/dist/styles/app.css" rel="stylesheet">
	  </head>
	  <body>
	  <div id="app">${html}</div>
		<script>window.$REDUX_STATE = ${initialState}</script>
		<script src="/dist/bundle.js"></script>
	  </body>
	</html>
	`;
}

// example of handling 404 pages
app.get('*', function (req, res) {
	res.status(404).send('Server.js > 404 - Page Not Found');
});

// global error catcher, need four arguments
app.use((err, req, res, next) => {
	console.error('Error on request %s %s', req.method, req.url);
	console.error(err.stack);
	res.status(500).send('Server error');
});

process.on('uncaughtException', evt => {
	console.log('uncaughtException: ', evt);
});

app.listen(3000, function () {
	console.log('Listening on port 3000');
});
