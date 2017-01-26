import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { fetchSearchResults } from '../actions/search-actions';
import { setActiveView } from '../actions/package-actions';

import TextField from 'material-ui/TextField';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = { };
	}

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	handleChange = e => {
		if (e.target.value && e.target.value.length > 1) {
			//this.props.setActiveView('details');

			if (this.state.timeout) {
				clearTimeout(this.state.timeout);
			}

			this.state.timeout = setTimeout(q => {
				browserHistory.replace(`/search?q=${q}`);
				this.props.fetchSearchResults(q);
			}, 1200, e.target.value);
		}
	}

	render() {
		return (
			<div>
				<form className={(this.props.searchResults || []).length < 1 ? 'hero' : ''} onSubmit={this.handleChange}>
					<input
						className="glow"
						type="search"
						name="q"
						placeholder="Search"
						onChange={this.handleChange} />
					<input type="submit" value="Search" />
				</form>
				<ul className="cards">
					{(this.props.searchResults || []).map((result, i) => {
						return (
							<li key={i}>
								<h1>{result.id}</h1>
								<ul className="content chips">
									{(result.versions || []).slice(0, 10).map(version => {
										return (
											<li key={version.name}>
												<Link to={`/packages/${result.id}@${version.name}`}>
													v{version.name}
												</Link>
											</li>
										);
									})}
									{(result.versions.length > 10) ? <li>{'+ ' + (result.versions.length - 10) + ' more ...'}</li> : ''}
								</ul>
								<a href={`https://www.npmjs.org/package/${result.id}`}>View at npmjs.org</a>
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
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
