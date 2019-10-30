import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { setAlert } from "../../actions/alert.actions";
import * as alertStyles from "./styles.scss";

export class Alert extends Component {
	createMarkup = () => {
		return { __html: this.props.body };
	};

	handleOnClose = () => {
		this.props.setAlert(false);
	};
	// TODO make it fade away after  9 seconds.
	render() {
		const { isVisible, feeling } = this.props;
		console.log(feeling, typeof feeling);
		const alertClasses = classNames(
			"alert",
			"center-all",
			{ "block fade-in-alert": isVisible },
			{ [feeling]: feeling }
		);
		return (
			<div className={alertClasses} styles={alertStyles}>
				<h1 className="title">{this.props.title}</h1>
				{this.props.body !== "" && (
					<div
						className="body"
						dangerouslySetInnerHTML={this.createMarkup()}
					/>
				)}
				<span className="lnr lnr-cross" onClick={this.handleOnClose} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		title: state.alertReducers.title,
		body: state.alertReducers.body,
		isVisible: state.alertReducers.isVisible,
		feeling: state.alertReducers.feeling,
		addNewFoodDrinkErrors: state.userReducers.addNewFoodDrinkErrors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setAlert: (isVisible, title = "", body = "") =>
			dispatch(setAlert(isVisible, title, body))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Alert);
