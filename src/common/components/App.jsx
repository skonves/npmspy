import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { navigateToView, setActiveView } from '../actions/package-actions';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import InfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';
import ListIcon from 'material-ui/svg-icons/action/list';
import HistoryIcon from 'material-ui/svg-icons/action/history';

class App extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			< div >
				<header>
					<AppBar icon="" zDepth={0} title="Npm Spy - beta" />
					<div className="middled">
						<Tabs value={this.props.activeView}>
							<Tab
								icon={<InfoOutlineIcon />}
								label="Details"
								value="details"
								onClick={() => {
									this.props.setActiveView('details');
									browserHistory.push(`/packages/${this.props.packageId}@${this.props.version}`);
								} } />
							<Tab
								icon={<ListIcon />}
								label="Dependencies"
								value="dependencies"
								onClick={() => {
									this.props.setActiveView('dependencies');
									browserHistory.push(`/packages/${this.props.packageId}@${this.props.version}/dependencies`);
								} } />
							<Tab
								icon={<HistoryIcon />}
								label="History"
								value="history"
								onClick={() => {
									this.props.setActiveView('history');
									browserHistory.push(`/packages/${this.props.packageId}@${this.props.version}/history`);
								} } />
						</Tabs>
					</div>
				</header>
				<section className="middled">
					<h1>{this.props.packageId}@{this.props.version}</h1>
					{this.props.children}
				</section>

				<footer>
				<div className="middled">made with 🤓 by steve konves</div></footer>
			</div >
		);
	}
}

function mapStateToProps({ packageReducer }, ownProps) {
	return { ...packageReducer, ...ownProps.params };
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		navigateToView: viewName => {
			dispatch(navigateToView(viewName));
		},
		setActiveView: viewName => {
			dispatch(setActiveView(viewName));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
