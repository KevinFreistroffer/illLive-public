import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AddFirstFoodItem = props => {
	if (props.user.foodDrinks.length < 1) {
		return (
	        <div className="add-first-food-item">
	          <Link to="/me/add">Add my first item</Link>
	        </div>
	    );
	} else {
		return (<div />)
	}
};


const mapStateToProps = state => {
	return {
		user: state.userReducers
	}
}

const mapDispatchToProps = dispatch => {
	return {

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFirstFoodItem);