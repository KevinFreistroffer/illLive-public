import {
	TOGGLE_DETAILS
} from '../actions/types';

const initialState = {
	showDetails: false
};

export const detailsReducers = (state = initialState, action) => {

	switch( action.type ) {
		// case SET_TEXT:
		// 	console.log(`[AlertReducer] SET_TEXT`);
		// 	return {
		// 		...state,
		// 		title: action.payload.title,
		// 		text: action.payload.text
		// 	}		
		case TOGGLE_DETAILS:
			return {
				...state,
				showDetails: action.payload.showDetails
			}
		default:
			return { ...state }
	}
};