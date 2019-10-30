import React, { PropTypes } from 'react';

export const Confirm24HourMealResetMessage = props => {

	return (
		<h2 id="meals-reset-message" className="flex space-between">
			Meals are reset every 24 hours, starting at 12:00am and resetting at 12:00pm 
			{!props.isConfirming && (<span onClick={props.beginConfirmMealReset24Hours} className="lnr lnr-cross"></span>)}
			{props.isConfirming && (<span className="fas fa-spin fa-spinner"></span>)}
		</h2>
	);
	
};

export default Confirm24HourMealResetMessage;
		