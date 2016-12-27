import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchVersionTree, fetchVersionHistory, setTreeIsActive, setHistoryIsActive } from '../actions/package-actions';

class Package extends Component {

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

		function renderTree(id, node, key) {
			return (
				<li key={key}>
					<div>{id}@{node.version}</div>
					<ul>
						{Object.keys(node.dependencies).map((k, i) => {
							return renderTree(k, node.dependencies[k], i);
						})}
					</ul>
				</li>
			);
		}

		let body;
		if (this.props.treeIsActive) {
			body = (
				<ul>
					{renderTree(this.props.tree.packageId, this.props.tree, 0)}
				</ul>
			);
		} else if (this.props.historyIsActive) {
			const items = (this.props.history || []).map(item => {
				return (
					<li key={item.ts}>{prettyDate(item.ts)}<ul>{item.paths.map((path, i) => {
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
					})}</ul></li>
				);
			});
			body = (
				<div>history
					<ul>{items}</ul>
				</div>
			);
		}

		return (
			<div>
				{this.props.versionId}
				<button onClick={() => this.props.setTreeIsActive()}>Tree</button>
				<button onClick={() => this.props.setHistoryIsActive()}>History</button>
				{body}
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Package);
