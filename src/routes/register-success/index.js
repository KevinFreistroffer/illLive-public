import React, { useEffect } from 'react';
import * as RegisterSuccessStyles from './styles.scss';

const RegisterSuccess = (props) => {
	useEffect(() => {
		document.title = "Successfull Registration"
	});		

	return(
		<div className="signup-success view-with-padding flex column center-all" styles={RegisterSuccessStyles}>
		  <h1>Your Account is created!</h1>
		  <h2>An email is being sent for you to confirm your account.</h2>
		  <button type="button" onClick={ () => alert('make this feature') }>Didn't receive it? Click here to have it resent.</button>	
		  <button type="button" onClick={ () => { props.history.push('/signin') } }>Sign In</button>
		</div>
	);
};

export default RegisterSuccess;
