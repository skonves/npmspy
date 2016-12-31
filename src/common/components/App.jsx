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
				<div className="page-wrap">
					<header>
						<h1>Npm Spy - beta</h1>
						<ul className="actions">
							<li>
								<Link to="/search">
									<svg height="20" className="icon" viewBox="0 0 24 24">
										<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
									</svg>
								</Link>
							</li>
						</ul>
						<div className="tab-container middled">{this.props.pageHeader}</div>
					</header>
					<section className="middled">
						{this.props.page}
					</section>
				</div>
				<footer>
					<div className="middled">{this.props.pageFooter}</div>
					<div className="middled">made with 🤓 by steve konves</div>
				</footer>
			</div>
		);
	}
}
