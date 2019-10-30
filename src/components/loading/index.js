import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LoadingStyles from './loading.scss';
import { setLoader } from '../../actions/loading.actions';
import loadingGif from './loadingGif.gif';

export class Loading extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isLoading) {
      return(
        <div id="loading" styles={LoadingStyles}>
          <h2>{this.props.text}</h2>
          {this.props.showSpinner && <img src={loadingGif} alt="Loading!" />}
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.loadingReducers.isLoading,
    text: state.loadingReducers.loadingText,
    showSpinner: state.loadingReducers.showSpinner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (isLoading = false, loadingText = "Loading ...") => dispatch(setLoader(isLoading, loadingText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
