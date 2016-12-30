import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSearchResults } from '../actions/search-actions';
import { setActiveView } from '../actions/package-actions';

import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

class Search extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	handleChange = e => {
		if (e.target.value && e.target.value.length > 1) {
			this.props.setActiveView('details');
			this.props.fetchSearchResults(e.target.value);
		}
	}

	render() {
		return (
			<div>
				<TextField hintText="Search" id="asdf" fullWidth={true} onChange={this.handleChange} />
				<ul>
					{(this.props.searchResults || []).map(result => {
						return (
							<li>
								<Card className="card">
									<CardHeader title={result.id} />
									<CardText>
										<ul className="inline">
											{(result.versions || []).slice(0, 10).map(version => {
												return (
													<li>
														<Link className="chip" to={`/packages/${result.id}@${version.name}`}>
															v{version.name}
														</Link>
													</li>
												);
											})}
											{(result.versions.length > 10) ? <li><Chip>{'+ ' + (result.versions.length - 10) + ' more ...'}</Chip></li> : ''}
										</ul>
										<a href={`https://www.npmjs.org/package/${result.id}`}>View at npmjs.org</a>
									</CardText>
								</Card>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return { ...state.searchReducer, ...ownProps.params };
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchSearchResults: query => {
			dispatch(fetchSearchResults(query));
		},
		setActiveView: viewName => {
			dispatch(setActiveView(viewName));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
