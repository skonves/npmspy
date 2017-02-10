/*import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class PackageHistory extends Component {
	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		function prettyDate(ts) {
			const diff = Date.UTC().getTime() - ts;
			if (diff < 7 * 86400000) {
				return (<span title={moment(ts, 'x').format()}>{moment(ts, 'x').calendar()}</span>);
			} else {
				return (<span title={moment(ts, 'x').format()}>{moment(ts, 'x').fromNow()}</span>);
			}
		}

		const versionId = `${this.props.packageId}@${this.props.version}`;

		function card(item) {
			return (
				<li key={item.ts}>
					<h1>{moment(item.ts, 'x').fromNow()}</h1>
					<h2>{moment(item.ts, 'x').format()}</h2>
					<Link to={`/packages/${versionId}/dependencies?ts=${item.ts}`} onClick={() => window.scroll(0, 0)}>view at ... </Link>
					<ul className="content changesets">{item.paths.map((path, i) => {
						return (
							<li key={i} >
								{diffLhs(path)}
								{diffRhs(path)}
							</li>
						);
					})}</ul>
				</li>
			);
		}

		function diffLhs(path) {
			return (
				<div className="lhs">{path.map((n, i) => {
					if (n.changed) {
						const packageId = n.versionId.substring(0, n.versionId.indexOf('@'));
						return (
							<span key={i}>
								<span>{packageId}@</span>
								<span className="changed">{n.previous}</span>
							</span>
						);
					} else {
						return (<span key={i}>{n.versionId}</span>);
					}
				})}</div>
			);
		}

		function diffRhs(path) {
			return (
				<div className="rhs">{path.map((n, i) => {
					if (n.changed) {
						const packageId = n.versionId.substring(0, n.versionId.indexOf('@'));
						const version = n.versionId.substring(n.versionId.indexOf('@') + 1);
						return (
							<span key={i}>
								<span>{packageId}@</span>
								<span className="changed">{version}</span>
							</span>
						);
					} else {
						return (<span key={i}>{n.versionId}</span>);
					}
				})}</div>
			);
		}

		return (
			<div>
				<ul className="cards">{(this.props.history || []).map(item => {
					return (
						card(item)
					);
				})}</ul>
			</div>
		);
	}
}

function mapStateToProps({ packageReducer }, ownProps) {
	//console.log(ownProps.params);
	return { ...packageReducer, ...ownProps.params };
}

export default connect(mapStateToProps)(PackageHistory);*/
