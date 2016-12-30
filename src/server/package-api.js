import express from 'express';

import { addAuth, clearAuth } from './auth';
import { getRepository } from '../common/utils/repository';
import operations from '../common/constants/operations';

const app = express();

app.get('/', (req, res) => {
	const values = {
		query: req.query.q
	};

	getRepository()
		.packages(operations.packages.SEARCH, values)
		.then(value => res.send(value))
		.catch(reason => res.status(500).send({ reason }));
});

app.get('/:packageId/versions', (req, res) => {
	const values = {
		packageId: req.params.packageId,
		offset: req.query.offset
	};

	getRepository()
		.packages(operations.packages.GET_VERSIONS, values)
		.then(value => res.send(value))
		.catch(reason => res.status(500).send({ reason }));
});

app.get('/:packageId/versions/:version', (req, res) => {
	const values = {
		packageId: req.params.packageId,
		version: req.params.version,
		ts: req.query.ts
	};

	getRepository()
		.packages(operations.packages.GET_DEPENDENCIES, values)
		.then(value => res.send(value))
		.catch(reason => res.status(500).send({ reason }));
});

app.get('/:packageId/versions/:version/history', (req, res) => {
	const values = {
		packageId: req.params.packageId,
		version: req.params.version,
		before: req.query.before
	};

	getRepository()
		.packages(operations.packages.GET_HISTORY, values)
		.then(value => res.send(value))
		.catch(reason => res.status(500).send({ reason }));
});

export default app;
