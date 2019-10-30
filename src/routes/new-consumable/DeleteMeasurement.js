import React from 'react';

const DeleteMeasurement = (index) => {
	return(
		<div className="delete-adjective" 
		     onClick={() => { this.deleteAdjective(index) }}>X
	    </div>
	);
};


export default DeleteMeasurement;