import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Package extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

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

export default connect(mapStateToProps)(Package);
