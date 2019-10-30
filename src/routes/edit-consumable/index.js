import React, { Component } from 'react';
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert.actions';
import { SERVER_URL } from '../../app-config';


export class EditConsumable extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      title: 'Edit Consumable',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  edit() {
    let item;

    console.log(`[Edit] add()`)
    // TODO send the item to database
    console.log(`fetch POST to api/user/addItem`);

    try {
      item = JSON.stringify({
        vitaminA: this.state.vitaminA,
        vitaminB1: this.state.vitaminB1,
        vitaminB2: this.state.vitaminB2,
        vitaminB3: this.state.vitaminB3,
        vitaminB5: this.state.vitaminB5,
        vitaminB6: this.state.vitaminB6,
        vitaminB7: this.state.vitaminB7,
        vitaminB12: this.state.vitaminB12,
        calcium: this.state.calcium,
        choline: this.state.choline,
        chromium: this.state.chromium,
        copper: this.state.copper,
        flouride: this.state.flouride,
        folicAcid: this.state.folicAcid,
        iodine: this.state.iodine,
        iron: this.state.iron,
        magnesium: this.state.magnesium,
        molybdenum: this.state.molybdenum,
        phosphorus: this.state.phosphorus,
        potassium: this.state.potassium,
        selenium: this.state.selenium,
        salt: this.state.salt,
        vitaminD3: this.state.vitaminD3,
        vitaminE: this.state.vitaminE,
        vitaminK: this.state.vitaminK,
        zinc: this.state.zinc
      });
    } catch(error) {
      console.log(`[Dashboard edit] An error occured stringifying an item, or some othe`, error);
    }

    if ( item.hasOwnProperty('iron') ) {
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({ item });

      fetch(`${SERVER_URL}/user/edit`, {
        method: 'POST',
        headers,
        body
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(`[Edit] error POSTing to user/newItem | error: ${error}`);

        // TODO handle error
      });  
    } else {
      // TODO handle error
      console.log(`[Dashboard edit] An error occured. `);
    }


  }

  handleSubmit() {
    return console.log(`handleSubmit`);
  }


  render() {
    return (
      <div className="edit view center-all">
        <h1>{this.state.title}</h1>
        <button onClick={ () => { this.handleSubmit() } }>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showAlert: state.alertReducers.showAlert
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (isVisible, title, body) => { dispatch( setAlert(isVisible, title, body) ) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditConsumable);