// import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { fetchVersionTree, fetchVersionHistory, setTreeIsActive, setHistoryIsActive } from '../actions/package-actions';

// class HistoryItem extends Component {

// 	static contextTypes = {
// 		store: React.PropTypes.object.isRequired,
// 	};

// 	render() {
// 		let body;
// 		if (this.props.treeIsActive) {
// 			body = (
// 				<div>tree
// 				<div>{JSON.stringify(this.props.tree)}</div>
// 				</div>
// 			);
// 		} else if (this.props.historyIsActive) {
// 			const items = (this.props.history || []).map(item => {
// 				return (
// 					<li key={item.ts}>{item.ts}{JSON.stringify(item)}</li>
// 				);
// 			});
// 			body = (
// 				<div>history
// 					<ul>{items}</ul>
// 				</div>
// 			);
// 		}

// 		return (
// 			<div>
// 				{this.props.versionId}
// 				<button onClick={() => this.props.setTreeIsActive()}>Tree</button>
// 				<button onClick={() => this.props.setHistoryIsActive()}>History</button>
// 				{body}
// 			</div>
// 		);
// 	}
// }

// function mapStateToProps({ packageReducer }, ownProps) {
// 	return { ...ownProps.params };
// }

// function mapDispatchToProps(dispatch, ownProps) {
// 	return {
// 		// fetchVersionTree: versionId => {
// 		// 	dispatch(fetchVersionTree(versionId));
// 		// },
// 		// fetchVersionHistory: versionId => {
// 		// 	dispatch(fetchVersionHistory(versionId));
// 		// },
// 		// setTreeIsActive: () => {
// 		// 	dispatch(setTreeIsActive(true));
// 		// },
// 		// setHistoryIsActive: () => {
// 		// 	dispatch(setHistoryIsActive(true));
// 		// }
// 	};
// }

// export default connect(mapStateToProps, mapDispatchToProps)(HistoryItem);
