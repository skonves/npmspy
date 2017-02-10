import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchDependencies } from '../actions/package-actions';

class PackageDependencies extends Component {
	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		function renderTree(id, node, key) {
			return (
				<li key={key}>
					<div>{id}@{node.version}</div>
					<ul className="hierarchy">
						{Object.keys(node.dependencies || {}).sort().map((k, i) => {
							return renderTree(k, node.dependencies[k], i);
						})}
					</ul>
				</li>
			);
		}

		function getDateMessage(ts) {
			return `As of ${ts}`;
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
			<div>
				<h2>{getDateMessage(this.props.ts)}</h2>
				{getLink(this.props)}
				<ul className="top hierarchy">
					{Object.keys(this.props.dependencies || {}).sort().map((k, i) => {
						return renderTree(k, this.props.dependencies[k], i);
					})}
				</ul>
			</div>
		);
	}
}

function mapStateToProps({ packageReducer }, ownProps) {
	return { ...packageReducer, ...ownProps.params };
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchDependencies: (packageId, version, ts) => {
			dispatch(fetchDependencies(packageId, version, ts));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageDependencies);
