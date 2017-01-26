import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchDependencies } from '../actions/package-actions';

class PackageDiff extends Component {
	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		function renderTree(id, node, key) {
			let liClass;
			if (node.$diff) {
				if (node.$diff.type === 'ADDED') {
					liClass = 'added';
				} else if (node.$diff.type === 'REMOVED') {
					liClass = 'removed';
				}
			}

			return (
				<li className={liClass} key={key}>
					<div>{id}@<span className={node.$diff && node.$diff.type === 'VERSION' ? 'changed' : ''}>{node.version}</span> {node.$diff && node.$diff.uri ? (<a target="_blank" rel="noopener noreferrer" href={node.$diff.uri}>diff</a>) : ''}</div>
					<ul className="hierarchy">
						{Object.keys(node.dependencies || {}).sort().map((k, i) => {
							return renderTree(k, node.dependencies[k], i);
						})}
					</ul>
				</li>
			);
		}

		function getDateMessage(ts) {

			const str = ts ? moment(ts).calendar() : 'right now';
			return `As of ${str}`;
		}

		function getLink(props) {
			if (props.ts) {
				const versionId = `${props.packageId}@${props.version}`;

				return (
					<Link
						to={`/packages/${versionId}/dependencies`}
						onClick={() => props.fetchDependencies(props.packageId, props.version)}>
						(View as of right now)
						</Link>
				);
			}
		}

		return (
			<div className="diff">
				<div className="lhs">
					<h2>{getDateMessage(this.props.diff.lhs.ts)}</h2>
					{getLink(this.props.diff.lhs)}
					<ul className="top hierarchy">
						{Object.keys(this.props.diff.lhs.dependencies || {}).sort().map((k, i) => {
							return renderTree(k, this.props.diff.lhs.dependencies[k], i);
						})}
					</ul>
				</div>
				<div className="rhs">
					<h2>{getDateMessage(this.props.diff.rhs.ts)}</h2>
					{getLink(this.props.diff.rhs)}
					<ul className="top hierarchy">
						{Object.keys(this.props.diff.rhs.dependencies || {}).sort().map((k, i) => {
							return renderTree(k, this.props.diff.rhs.dependencies[k], i);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ packageReducer }, ownProps) {
	//console.log( JSON.stringify(packageReducer.diff));
	return { ...packageReducer, ...ownProps.params };
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchDependencies: (packageId, version, ts) => {
			dispatch(fetchDependencies(packageId, version, ts));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageDiff);
