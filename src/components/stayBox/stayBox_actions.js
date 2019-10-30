import { SET_STAY_BOX } from './types';

export const setStayBox = (isVisible, text = '') => {
	console.log(`setStayBox`, isVisible, text);
	return {
		type: SET_STAY_BOX,
		payload: {
			isVisible,
			text
		}
	}
}