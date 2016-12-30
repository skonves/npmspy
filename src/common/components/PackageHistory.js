import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { setActiveView } from '../actions/package-actions';

import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

class PackageHistory extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	componentWillMount() {
		if (this.props.setActiveView !== 'history') {
			this.props.setActiveView('history');
		}
	}

	render() {
		function prettyDate(ts) {
			const diff = new Date().getTime() - ts;
			if (diff < 7 * 86400000) {
				return (<span title={moment(ts, 'x').format()}>{moment(ts, 'x').calendar()}</span>);
			} else {
				return (<span title={moment(ts, 'x').format()}>{moment(ts, 'x').fromNow()}</span>);
			}
		}

		function card(item) {
			return (
				<li key={item.ts}>
					<h1>{moment(item.ts, 'x').fromNow()}</h1>
					<h2>{moment(item.ts, 'x').format()}</h2>
					<ul className="changesets">{item.paths.map((path, i) => {
						return (
							<li key={i} >
								{diffLhs(path)}
								{diffRhs(path)}
							</li>
						);
					})}</ul>
				</li>
			);
		}

		function diffLhs(path) {
			return (
				<div className="lhs">{path.map((n, i) => {
					if (n.changed) {
						const packageId = n.versionId.substring(0, n.versionId.indexOf('@'));
						return (
							<span key={i}>
								<span>{packageId}@</span>
								<span className="changed">{n.previous}</span>
							</span>
						);
					} else {
						return (<span key={i}>{n.versionId}</span>);
					}
				})}</div>
			);
		}

		function diffRhs(path) {
			return (
				<div className="rhs">{path.map((n, i) => {
					if (n.changed) {
						const packageId = n.versionId.substring(0, n.versionId.indexOf('@'));
						const version = n.versionId.substring(n.versionId.indexOf('@') + 1);
						return (
							<span key={i}>
								<span>{packageId}@</span>
								<span className="changed">{version}</span>
							</span>
						);
					} else {
						return (<span key={i}>{n.versionId}</span>);
					}
				})}</div>
			);
		}

		return (
			<div>
				<ul className="cards">{(this.props.history || []).map(item => {
					return (
						card(item)
					);
				})}</ul>
			</div>
		);
	}
}

function mapStateToProps({ historyReducer }, ownProps) {
	//console.log(ownProps.params);
	return { ...historyReducer, ...ownProps.params };
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		setActiveView: viewName => {
			dispatch(setActiveView(viewName));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageHistory);
