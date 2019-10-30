import React, { Component } from 'react';

export default class DeleteMeasurement extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	} 

	deleteMeasurement( index ) {
		this.props.deleteMeasurement(index);
	}

	render() {
		return (
			<div className="delete-measurement" onClick={ () => { this.deleteMeasurement(this.props.index) } }>X</div>
		);
	}
}; 


