import React, { Component } from 'react';
import { toggleDetails } from '../../actions/details.actions';
import { connect } from 'react-redux';
import * as DetailsStyles from './styles.css';

export class Details extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: 'Vitamin Details Moda'
		}
	}

	render() {
		return(
			<div className="vitamin-details-modal center-all" styles={DetailsStyles}>
				<button onClick={ () => { this.props.toggleDetails(false) } }>X</button>
				<h1>{this.state.title}</h1>
				<h2>{this.props.vitamin}</h2>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		...state
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleDetails: showDetails => { dispatch(toggleDetails(showDetails)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);