import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchVersion } from '../actions/package-actions';

class Package extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	// componentWillMount() {
	// 	console.log(this.props.params);

	// 	const { versionId } = this.props;
	// 	const packageId = versionId && versionId.indexOf('@') > 0 ? versionId.split('@')[0] : undefined;
	// 	const version = versionId && versionId.indexOf('@') > 0 ? versionId.split('@')[1] : undefined;

	// 	if (this.props.packageId !== packageId && this.props.version !== version) {
	// 		this.props.fetchVersion(packageId, version);
	// 	}
	// 	// if (this.props.setActiveView !== 'history') {
	// 	// 	this.props.setActiveView('history');
	// 	// }
	// }

	render() {
		return (
			<div>
				<h1>{this.props.packageId}@{this.props.version}</h1>
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps({ packageReducer }, ownProps) {
	return { ...packageReducer, ...ownProps.params };
}

// function mapDispatchToProps(dispatch, ownProps) {
// 	return {
// 		fetchVersion: (packageId, version) => {
// 			dispatch(fetchVersion(packageId, version));
// 		}
// 	};
// }

export default connect(mapStateToProps)(Package);
