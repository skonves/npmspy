import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';

import InfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';
import ListIcon from 'material-ui/svg-icons/action/list';
import HistoryIcon from 'material-ui/svg-icons/action/history';

export default class App extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<div>
				<header>
					<AppBar zDepth={0} title="npm spy" />
					<Tabs>
						<Tab
							icon={<InfoOutlineIcon />}
							label="Details" />
						<Tab
							icon={<ListIcon />}
							label="Dependencies" />
						<Tab
							icon={<HistoryIcon />}
							label="History" />
					</Tabs>
				</header>
				<section style={{ width: 800 }}>
					{this.props.children}
				</section>

				<footer>made with 🤓 by steve konves</footer>
			</div >
		);
	}
}
