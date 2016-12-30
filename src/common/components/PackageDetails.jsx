import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { setActiveView } from '../actions/package-actions';

import RaisedButton from 'material-ui/RaisedButton';

class PackageDetails extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	componentWillMount() {
		if (this.props.activeView !== 'details') {
			this.props.setActiveView('details');
		}
	}

	render() {
		return (
			<div className="comment">// TODO: fetch and show package details.</div>
		);
	}
}

function mapStateToProps({ packageReducer }, ownProps) {
	return { ...packageReducer, ...ownProps.params };
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		setActiveView: viewName => {
			dispatch(setActiveView(viewName));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetails);
