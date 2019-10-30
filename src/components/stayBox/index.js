import React from "react";
import { connect } from "react-redux";
import { setStayBox } from "../../actions/staybox.actions";
import { beginConfirm24HourMealResetMessage } from "../../actions/user.actions";
import * as StayBoxStyles from "./styles.scss";

function createMarkup(html) {
	return {
		__html: html
	};
}

export const StayBox = props => {
	return (
		<div
			className="stay-box flex row space-between align-center"
			styles={StayBoxStyles}
		>
			<div className="text" dangerouslySetInnerHTML={createMarkup(props.text)} />
			<div
				className="close-stay-box"
				onClick={() => {
					console.log(props.confirm24HourMealReset);
					if (!props.confirm24HourMealReset) props.confirm24HourMealResetMessage(); 
					props.setStayBox(false, "");
				}}
			>
				<span className="lnr lnr-cross"> </span> 
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isVisible: state.stayBoxReducers.isVisible,
		text: state.stayBoxReducers.text,
		confirm24HourMealReset: state.userReducers.confirmed24HourMealResetMessage
	};
};

const mapDispatchToProps = dispatch => {
	return {
		confirm24HourMealResetMessage: () => dispatch(beginConfirm24HourMealResetMessage()),
		setStayBox: (isVisible, text) => dispatch(setStayBox(isVisible, text))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StayBox);
