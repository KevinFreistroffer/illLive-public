import React, { Component, Fragment } from 'react';

const styles = {
  form: {
    width: '350rem',
    maxWidth: '25rem',
    height: '50vh',
    minHeaight: '20rem',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '999999999'
  },
  confirmText: {
    color: '#222',
    fontSize: '1.5rem'
  },
  button: {
    width: '9rem',
    margin: '1rem auto',
    fontSize: '1.5rem',
    backgroundColor: '#333',
    border: 'none',
    boxShadow: '0 0.2rem 0.2rem #000'
  }
};


// TODO rename this to confirm or similar
export class AreYouSure extends Component {

  constructor(props) {
    super(props);

    this.answer = this.answer.bind(this);
  }




  answer( is ) {
    console.log(`[AreYouSure] answer( ${is} )`);

    this.props.answerIs(is);
  }


  render() {
    return (
      <form className="flex center-all" style={styles.form}>
        <p style={styles.confirmText}>Are you sure?</p>
        <button className="btn btn-primary" style={styles.button} type="button" onClick={() => {
          this.answer('yes');
        }}>Yes</button>
        <button  className="btn btn-primary" style={styles.button} type="button" onClick={() => {
          this.answer('no')
        }}>No</button>
      </form>
    );
  }
}


export default AreYouSure;