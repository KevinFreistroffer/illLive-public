import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../actions/user.actions';
import { setProfileAfterSignUp } from '../../services/user.service';
import { setLoader } from '../../actions/loading.actions';
import * as CreateProfileAfterSignupStyles from './styles.scss';

export class CreateProfileAfterSignup extends Component {

  constructor(props) {
    super(props);

    this.state = {
          title: 'Some details about me to calculate your recommended amount of vitamins',
          profileSaved: false,
          ageErrorText: '',
          weightErrorText: '',
          formErrorText: '',
          formSubmitted: false
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnBlur   = this.handleOnBlur.bind(this);
    this.handleSubmit   = this.handleSubmit.bind(this);
  }



  componentWillMount() {}



  componentDidMount() {}



  inputsAreAllPopulated() {
    return true;
  }



  handleOnChange(event) {

  }



  handleOnBlur(event) {
    // Handles empty values for all inputs

  }



  handleSubmit(event) {
    event.preventDefault();

    // If all inputs are populated ...
    if ( this.inputsAreAllPopulated() ) {

      // Show spinner icon
      this.setState({ formSubmitted: true });

      const body = {
        age: this.state.age,
        weight: this.state.weight
      };

      // POST to api/signup
      setProfileAfterSignUp(body)
      .then(response => {

        console.log(response.data);
        
        const {
          success,
          message,
          data: { payload } 
        } = response.data;


        // Success
        if (success) {
          console.log(`response data.payload:`, payload);

          // Store user in store
          this.props.setUser(payload.foundUser);

          // "Signed In!"
          this.props.setLoader(true, "Your info has been updated.");
          this.props.setLoader(false, "Loading ...");

          // Hide spinner icon
          this.setState({ formSubmitted: false });

          // Route to their dashboard
          this.props.history.push('/dashboard');

          return;
        } 

        this.setState({
          profileSaved: success,
          formErrorText: message,
          formSubmitted: false
        }, () => {
          // Hide loader
            this.props.setLoader(false);
        });

            
      })
      .catch(error => {
        console.log(`fetch api/profile-after-signup error`, error);

        this.setState({
          formSubmitted: false,
          formErrorText: 'My bad ... go ahead and try again.'
        });

        console.log(error);
      });

    // Otherwise find the empty inputs
    } else {
      const age    = this.state.age.replace(" ", "");
      const weight = this.state.weight.replace(" ", "");

      // Is the username/email input empty?
      this.setState({
        formErrorText: ( age || weight ) === "" ? "Please enter your age, weight." : ""
      });
    }
  }



  render() {

    let formErrorText;
    let state = this.state;

    // Create a form error text div with the error if it's errorState is not an empty string
    if (state.formErrorText !== "") {
      formErrorText = <div className="form-error-text">{state.formErrorText}</div>
    }

    return(
      <div className="profile-after-signup view-with-padding center-all" styles={CreateProfileAfterSignupStyles}>

        <h1 className="view-title">{this.state.title}</h1>

        <form className={`profile-form ${this.state.validForm ? 'display-errors' : '' }` }
              onSubmit={this.handleSubmit}
              noValidate>

          {formErrorText}

          {/* Age */}
          <div className="form-group">
            <input
              name="age" type="number"
              id="intro-profile-age"
              className={this.state.ageErrorText !== '' ? 'form-error-input' : ''}
              placeholder="My age"
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              required/>
          </div>

          {/* Weight */}
          <div className="form-group">
            <input
              ref="weight"
              name="weight"
              id="intro-profile-weight"
              className={this.state.weightErrorText !== '' ? 'form-error-input' : ''}
              placeholder="My weight"
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              required/>
              

              <select 
                name="weight-measurement" 
                id="weight-measurement"
                ref="weight-measurement" 
                onChange={this.handleOnChange}>
                <option value="lbs" selected>lbs</option>
                <option value="kg" selected>kg</option>
              </select>
          </div>


          <button type="submit">
            {
              this.state.formSubmitted && <i className="fa fa-spinner fa-pulse"></i>
            }
            { 
              !this.state.formSubmitted && "Go"
            }
          </button>
          <h6 className="link-to-opposite-form"><Link to="/dashboard">Set these values later?</Link></h6>
        </form>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    user: state.userReducers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (isLoading = false, loadingText = "Loading ..."  ) => dispatch(setLoader(isLoading, loadingText)),
    setUser: (user) => { dispatch(setUser(user)) }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProfileAfterSignup));
