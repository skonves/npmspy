import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { setActiveView } from '../actions/package-actions';

class PackageDependencies extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	componentWillMount() {
		if (this.props.setActiveView !== 'dependencies') {
			this.props.setActiveView('dependencies');
		}
	}

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

		return (
			<div>
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
	//console.log(ownProps.params);
	return { ...packageReducer, ...ownProps.params };
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		setActiveView: viewName => {
			dispatch(setActiveView(viewName));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageDependencies);
