import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setActiveView } from '../actions/package-actions';

import RaisedButton from 'material-ui/RaisedButton';

class PackageDetails extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<div className="comment">// TODO: fetch and show package details.</div>
		);
	}
}

function mapStateToProps({ packageReducer }, ownProps) {
	return { ...packageReducer, ...ownProps.params };
}

export default connect(mapStateToProps)(PackageDetails);
