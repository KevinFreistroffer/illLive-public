import React, { Component } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert.actions";
//import { setMeal } from "../../actions/user.actions";
import { getVitamins } from "../../utilities/index.js";

export class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      title: "Details",
      consumable: null,
      vitamins: null,
      consumableId: null,
      consumableIndex: 0
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleOnNext = this.handleOnNext.bind(this);
    this.handleOnPrevious = this.handleOnPrevious.bind(this);
    this.outputItemMeasurementOptions = this.outputItemMeasurementOptions.bind(
      this
    );
  }

  componentDidMount() {
    console.log(this.props);

    this.setState(
      {
        vitamins: getVitamins()
      },
      () => {
        console.log(this.state.vitamins);
      }
    );

    // if ( this.props.user && this.props.user.hasOwnProperty('consumables') && this.props.user.consumables.length ) {
    //   this.props.user.consumables.find((consumable, index) => {
    //     if ( consumable._id === this.props.match.params.id ) {
    //       return this.setState({
    //         item: consumable,
    //         consumableIndex: index
    //       });
    //     } else {
    //       return;
    //     }
    //   });
    // }
  }

  componentWillReceiveProps() {}

  setSelectedConsumable(consumable) {}

  closeModal() {
    //this.props.history.push('/set-meal');
    this.props.close();
  }

  handleOnPrevious() {
    const { user } = this.props;
    const { consumableIndex: index } = this.state;

    if (
      user &&
      user.hasOwnProperty("consumables") &&
      Array.isArray(user.consumables)
    ) {
      // get the length of the arrayu
      // get the index of the consumable

      if (index <= 0) {
        // hide the previous button
      } else {
        this.setState({
          item: user.consumables[index - 1],
          consumableIndex: index - 1
        });
      }
    }
  }

  handleOnNext() {
    const { user } = this.props;
    const { consumableIndex: index } = this.state;
    let length = 0;

    if (
      user &&
      user.hasOwnProperty("consumables") &&
      Array.isArray(user.consumables)
    ) {
      // get the length of the arrayu
      // get the index of the consumable

      length = user.consumables.length;

      if (index + 1 >= length) {
        // hide the previous button
      } else {
        this.setState({
          item: user.consumables[index + 1],
          consumableIndex: index + 1
        });
      }
    }
  }

  outputMeasurement(vitamin) {
    const { vitamins } = this.state;
    let measurement = vitamins.find((v, index) => {
      if (v.inputName === vitamin) {
        measurement = v.measurement;
        return v.measurement;
      } else {
        return undefined;
      }
    });

    return measurement;
  }

  outputConsumableDetails() {
    const { user } = this.props;
    const { vitamins } = this.state;

    return user.consumables.map((consumable, index) => {
      return (
        <div key={index}>
          <li className="vitamin">
            <span>{this.state.vitamins[index]["name"]}:</span>
            {vitamins[index].measurement}
          </li>
        </div>
      );
    });
  }

  add(consumable) {
    console.log(consumable);

    // HTTP request to user/adds
    // .then()
    // dispatch(updateUser)
    //

    // setMeal()
    //   .then(results => {
    //     console.log(`[Detail -> add()] setMeal() .then() results`, results);
    //   })
    //   .catch(error => {
    //     console.log(`An error occured setting a meal`);
    //   });
  }

  outputItemMeasurementOptions(servingSize) {
    return servingSize.map((m, index) => {
      return (
        <option name="servingSize" key={index + 1} ref="servingSize" value="m">
          {m}
        </option>
      );
    });
  }

  render() {
    const { item } = this.state;

    let consumable;
    let itemName = "";

    // if (servingSize.length === 1) {
    //   itemServingSize = servingSize[0];
    // } else {
    //   itemServingSize = (
    //     <select className="servingSize" name="servingSize" ref="servingSize">
    //       {this.outputItemMeasurementOptions()}
    //     </select>
    //   )
    // }

    if (item) {
      if (item.hasOwnProperty("servingSize")) {
      }
      if (item.hasOwnProperty("itemName")) {
        itemName = item.itemName;
        consumable = (
          <div className="consumable-wrapper">
            <ul className="vitamins">
              {this.outputConsumableDetails}
              <li className="vitamin">
                <span>Vitamin A:</span>
                {item.vitaminA}
                <div className="my-amounts">
                  <div>RDA: 100</div>
                  <div>Current: 42</div>
                </div>
              </li>
              <li className="vitamin">
                <span>Vitamin B1:</span>
                {item.vitaminB1}
              </li>
              <li className="vitamin">
                <span>Vitamin B2:</span>
                {item.vitaminB2}
              </li>
              <li className="vitamin">
                <span>Vitamin B3:</span>
                {item.vitaminB3}
              </li>
              <li className="vitamin">
                <span>Vitamin B5:</span>
                {item.vitaminB5}
              </li>
              <li className="vitamin">
                <span>Vitamin B6:</span>
                {item.vitaminB6}
              </li>
              <li className="vitamin">
                <span>Vitamin B7:</span>
                {item.vitaminB7}
              </li>
              <li className="vitamin">
                <span>Vitamin B12:</span>
                {item.vitaminB12}
              </li>
              <li className="vitamin">
                <span>Calium:</span>
                {item.calcium}
              </li>
              <li className="vitamin">
                <span>Chromium:</span>
                {item.chromium}
              </li>
              <li className="vitamin">
                <span>Choline:</span>
                {item.choline}
              </li>
              <li className="vitamin">
                <span>Copper:</span>
                {item.copper}
              </li>
              <li className="vitamin">
                <span>Flouride:</span>
                {item.flouride}
              </li>
              <li className="vitamin">
                <span>Folic Acid:</span>
                {item.folicAcid}
              </li>
              <li className="vitamin">
                <span>Iodine:</span>
                {item.iodine}
              </li>
              <li className="vitamin">
                <span>Iron:</span>
                {item.iron}
              </li>
              <li className="vitamin">
                <span>Magnesium:</span>
                {item.magnesium}
              </li>
              <li className="vitamin">
                <span>Phosphorus:</span>
                {item.phosphorus}
              </li>
              <li className="vitamin">
                <span>Potassium:</span>
                {item.potassium}
              </li>
              <li className="vitamin">
                <span>Selenium:</span>
                {item.selenium}
              </li>
              <li className="vitamin">
                <span>Salt:</span>
                {item.salt}
              </li>
              <li className="vitamin">
                <span>Vitamin D3:</span>
                {item.vitaminD3}
              </li>
              <li className="vitamin">
                <span>Vitamin E:</span>
                {item.vitaminE}
              </li>
              <li className="vitamin">
                <span>Vitamin K:</span>
                {item.vitaminK}
              </li>
              <li className="vitamin">
                <span>Zinc:</span>
                {item.zinc}
              </li>
            </ul>
          </div>
        );
      } else {
        consumable = (
          <div className="consumable-wrapper">
            <p className="no-item-selected">No item selected.</p>
          </div>
        );
      }
    }

    return (
      <div className="detail view">
        <div className="detail-header">
          <h1>{itemName}</h1>
          <div className="close-container">
            Close <i className="fa fa-times close" onClick={this.closeModal} />
          </div>
        </div>
        <div className="detail-controls">
          <div
            className="previous"
            onClick={() => {
              this.handleOnPrevious();
            }}
          >
            Previous
          </div>
          <div
            className="next"
            onClick={() => {
              this.handleOnNext();
            }}
          >
            Next Item
          </div>
        </div>
        {consumable}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showAlert: state.alertReducers.showAlert,
    user: state.userReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: (isVisible, text) => dispatch(setAlert(isVisible, text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
