import request from 'superagent';

import operations from '../../common/constants/operations';

const endpoint = 'http://localhost:3001';

function search(values) {
	const query = (values || {}).query;

	return new Promise((resolve, reject) => {
		request.get(`${endpoint}/packages/?q=${query}`, (err, res) => {
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

	return new Promise((resolve, reject) => {
		request.get(`${endpoint}/packages/${packageId}/versions?offset=${offset}`, (err, res) => {
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
	const ts = (values || {}).ts;

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

function getHistory(values) {
	const packageId = (values || {}).packageId;
	const version = (values || {}).version;
	const before = (values || {}).before;

	const uri = `${endpoint}/packages/${packageId}/versions/${version}/history?before=${before}`;

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

// NOTE: These switch options MUST MATCH the server-side strategy
export default function (name, values) {
	switch (name) {
		case operations.packages.SEARCH:
			return search(values);
		case operations.packages.GET_VERSIONS:
			return getVersions(values);
		case operations.packages.GET_DEPENDENCIES:
			return getDependencies(values);
		case operations.packages.GET_HISTORY:
			return getHistory(values);
	}
}
