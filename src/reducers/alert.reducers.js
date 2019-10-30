import {SET_ALERT} from "../actions/types";

const initialState = {  isVisible: false, title: "", text: "", feeling: "info" }

export const alertReducers = (state = initialState, { type, payload }) => {
	switch(type) {
		case SET_ALERT:
			return {
				...state,
				isVisible: payload.isVisible,
				title: payload.title, 
				body: payload.body,
				feeling: payload.feeling
			};
		default:
			return { ...state };
	}
};
