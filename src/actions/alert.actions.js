import { SET_ALERT } from "./types";


export const setAlert = (isVisible, title = '', body = '', feeling = 'info') => {
	return {
		type: SET_ALERT,
		payload: {
			isVisible,
			title,
			body,
			feeling
		}
	}
} 
