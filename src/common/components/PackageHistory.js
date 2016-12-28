import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchVersionTree, fetchVersionHistory, setTreeIsActive, setHistoryIsActive } from '../actions/package-actions';

import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

class PackageHistory extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		function prettyDate(ts) {
			const diff = new Date().getTime() - ts;
			if (diff < 7 * 86400000) {
				return (<span title={moment(ts, 'x').format()}>{moment(ts, 'x').calendar()}</span>);
			} else {
				return (<span title={moment(ts, 'x').format()}>{moment(ts, 'x').fromNow()}</span>);
			}
		}

		return (
			<ul>{(this.props.history || []).map(item => {
				return (
					<li key={item.ts}>
						<Card style={{ margin: 20 }}>
							<CardHeader title={moment(item.ts, 'x').fromNow()} subtitle={moment(item.ts, 'x').format()} />
							<CardText>

								<ul>{item.paths.map((path, i) => {
									return (
										<li key={i} className="changeset">
											<div className="lhs">{path.map((n, j) => {
												if (n.changed) {
													const packageId = n.versionId.substring(0, n.versionId.indexOf('@'));
													return (
														<span key={j}>
															<span>{packageId}@</span>
															<span className="changed">{n.previous}</span>
														</span>
													);
												} else {
													return (<span key={j}>{n.versionId}</span>);
												}
											})}</div>
											<div className="rhs">{path.map((n, j) => {
												if (n.changed) {
													const packageId = n.versionId.substring(0, n.versionId.indexOf('@'));
													const version = n.versionId.substring(n.versionId.indexOf('@') + 1);
													return (
														<span key={j}>
															<span>{packageId}@</span>
															<span className="changed">{version}</span>
														</span>
													);
												} else {
													return (<span key={j}>{n.versionId}</span>);
												}
											})}</div>
										</li>
									);
								})}</ul>


							</CardText>
						</Card>
					</li>
				);
			})}</ul>
		);
	}
}

function mapStateToProps({ packageReducer }, ownProps) {
	//console.log(ownProps.params);
	return { ...packageReducer, ...ownProps.params };
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchVersionTree: versionId => {
			dispatch(fetchVersionTree(versionId));
		},
		fetchVersionHistory: versionId => {
			dispatch(fetchVersionHistory(versionId));
		},
		setTreeIsActive: () => {
			dispatch(setTreeIsActive(true));
		},
		setHistoryIsActive: () => {
			dispatch(setHistoryIsActive(true));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageHistory);
