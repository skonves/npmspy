import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import SearchIcon from 'material-ui/svg-icons/action/search';
import AppBar from 'material-ui/AppBar';

export default class App extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<div>
				<header>
					<AppBar icon="" zDepth={0} title="Npm Spy - beta" >
						<Link to="/search"><SearchIcon className="action-icon" color="white" /></Link>
					</AppBar>
					<div className="middled">{this.props.pageHeader}</div>
				</header>
				<section className="middled">
					{this.props.page}
				</section>

				<footer>
					<div className="middled">{this.props.pageFooter}</div>
					<div className="middled">made with 🤓 by steve konves</div>
				</footer>
			</div>
		);
	}
}
