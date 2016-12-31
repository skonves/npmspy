import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

class PackageHeader extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		const baseRoute = `/packages/${this.props.packageId}@${this.props.version}`;
		//console.log(JSON.stringify(this.props));
		return (
			<div>
				<nav>
					<ul className="tabs">
						<li className={this.props.activeView === 'details' ? 'active' : ''}>
							<Link to={`${baseRoute}`}>
								<svg height="20" className="icon" viewBox="0 0 24 24">
									<path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z" />
								</svg>
								Details
							</Link>
						</li>
						<li className={this.props.activeView === 'dependencies' ? 'active' : ''}>
							<Link to={`${baseRoute}/dependencies${this.props.ts ? `?ts=${this.props.ts}` : '' }`}>
								<svg height="20" className="icon" viewBox="0 0 24 24">
									<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
								</svg>
								Dependencies
							</Link>
						</li>
						<li className={this.props.activeView === 'history' ? 'active' : ''}>
							<Link to={`${baseRoute}/history`}>
								<svg height="20" className="icon" viewBox="0 0 24 24">
									<path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
								</svg>
								History
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}

function mapStateToProps({ packageReducer }, ownProps) {
	const { packageId, version, activeView, ts } = packageReducer;
	return { ...packageReducer, ...ownProps };
}

export default connect(mapStateToProps)(PackageHeader);
