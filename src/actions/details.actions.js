import {
	TOGGLE_DETAILS
} from './types';

// export const setText = ( title = '', body = '' ) => {
// 	return {
// 		type: SET_TEXT,
// 		payload: {
// 			title,
// 			body
// 		}
// 	}
// };

export const toggleDetails = ( showDetails ) => {
	return {
		type: TOGGLE_DETAILS,
		payload: {
			showDetails
		}
	}
};