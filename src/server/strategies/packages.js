import request from 'superagent';

import operations from '../../common/constants/operations';

// TODO: promote endpoint to a config file
const endpoint = process.env.NPMSPY_API_HOST || 'https://api.npmspy.com'; //'http://localhost:3001';

function search(values) {
	const query = ((values || {}).query || '').toLowerCase();

	const offset = 0;
	const limit = 10;

	return new Promise((resolve, reject) => {
		request.get(`${endpoint}/packages?q=${query}&offset=${offset}&limit=${limit}`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.body);
			}
		});
	});
}

function getVersions(values) {
	const packageId = (values || {}).packageId;
	const offset = (values || {}).offset || 0;

	const limit = 5;

	return new Promise((resolve, reject) => {
		request.get(`${endpoint}/packages/${packageId}/versions?offset=${offset}&limit=${limit}`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.body);
			}
		});
	});
}

function getDependencies(values) {
	const packageId = (values || {}).packageId;
	const version = (values || {}).version;
	const ts = Number((values || {}).ts);

	let uri = `${endpoint}/packages/${packageId}/versions/${version}`;
	if (ts) {
		uri = `${uri}?ts=${ts}`;
	}

	return new Promise((resolve, reject) => {
		request.get(uri, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.body);
			}
		});
	});
}

function getDiff(values) {
	const packageId = (values || {}).packageId;
	const version = (values || {}).version;
	const ts = (values || {}).ts;
	const rhsversion = (values || {}).rhsversion;
	const rhsts = (values || {}).rhsts;

	const uri = `${endpoint}/packages/${packageId}/versions/${version}/diff`;

	return new Promise((resolve, reject) => {
		request.get(uri).query({ ts, rhsversion, rhsts }).end((err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.body);
			}
		});
	});
}

function getHistory(values) {
	const packageId = (values || {}).packageId;
	const version = (values || {}).version;
	const before = (values || {}).before;

	const limit = 25;

	const uri = `${endpoint}/packages/${packageId}/versions/${version}/history?before=${before}&limit=${limit}`;

	return new Promise((resolve, reject) => {
		request.get(uri, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.body);
			}
		});
	});
}

function get(uri) {
	return new Promise((resolve, reject) => {
		request.get(uri, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.body);
			}
		});
	});
}

// NOTE: These switch options MUST MATCH the client-side strategy
export default function (name, values) {
	switch (name) {
		case operations.packages.SEARCH:
			return search(values);
		case operations.packages.GET_VERSIONS:
			return getVersions(values);
		case operations.packages.GET_DEPENDENCIES:
			return getDependencies(values);
		case operations.packages.GET_DIFF:
			return getDiff(values);
		case operations.packages.GET_HISTORY:
			return getHistory(values);
	}
}
