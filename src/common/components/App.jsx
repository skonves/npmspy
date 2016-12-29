import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

export default class App extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<div>
				<header>
					<AppBar icon="" zDepth={0} title="Npm Spy - beta" />
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
