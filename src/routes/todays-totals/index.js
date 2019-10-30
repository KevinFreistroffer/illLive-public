import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoader } from '../../actions/loading.actions'; 
import { toggleDetails } from '../../actions/details.actions';
//import { calculateTotals } from './totals_actions';
import NutrientData from './NutrientData';
import * as styles from './styles.scss';
import * as vitaminsObj from '../../vitamins.json';

export class TodaysTotals extends Component {
/* basically this.vitsMinsCals.map( v => {
    foodDrinks.map(f => {
      

    })
})*/
  constructor(props) {
    super(props);
    this.state = {
      title: 'My Totals',
      vitaminsUpdated: false,
      selctedVitamin: '',
      showVitaminDetailsModal: false,
      userHasNoMeals: false,
      vitaminsMineralsCalories: [
        {
          name: 'Calories',
          id: 'calories',
          inputName: 'calories',
          rda: 2000,
          measurement: 'mcg',
          total: 0
        },
        {
          name: "Vitamin-A",
          id: "vitamin-a",
          inputName: "vitaminA",
          rda: 900,
          measurement: "mcg",
          total: 0
        },
        {
          name: "Vitamin-B1",
          id: "vitamin-b1",
          inputName: "vitaminB1",
          rda: 1.2,
          measurement: "mg",
          total: 0
        },
        {
          name: "Vitamin-B2",
          id:   "vitamin-b2",
          inputName: "vitaminB2",
          rda: 1.3,
          measurement: "mg",
          total: 0
        },
        {
          name: "Vitamin-B3",
          id: "vitamin-b3",
          inputName: "vitaminB3",
          rda: 16,
          measurement: "mg",
          total: 0
        },
        {
          name: "Vitamin-B5",
          id: "vitamin-B5",
          inputName: "vitaminB5",
          rda: 5,
          measurement: "mg",
          total: 0
        },
        {
          name: "Vitamin-B6",
          id: "vitamin-b6",
          inputName: "vitaminB6",
          rda: 1.3,
          measurement: "mg",
          total: 0
        },
        {
          name: "Vitamin-B7",
          id: "vitamin-b7",
          inputName: "vitaminB7",
          rda: 30,
          measurement: "mcg",
          total: 0
        },
        {
          name: "Vitamin-B12",
          id: "vitamin-b12",
          inputName: "vitaminB12",
          rda: 2.4,
          measurement: "mcg",
          total: 0
        },
        {
          name: "Calcium",
          id: "calcium",
          inputName: "calcium",
          rda: 1000,
          measurement: "mg",
          total: 0
        },
        {
          name: "Choline",
          id: "choline",
          inputName: "choline",
          rda: 550,
          measurement: "mg",
          total: 0
        },
        {
          name: "Chromium",
          id: "chromium",
          inputName: "chromium",
          rda: 35,
          measurement: "mcg",
          total: 0
        },
        {
          name: "Copper",
          id: "copper",
          inputName: "copper",
          rda: 900,
          measurement: "mcg",
          total: 0
        },
        {
          name: "Fluoride",
          id: "fluoride",
          inputName: "fluoride",
          rda: 4,
          measurement: "mg",
          total: 0
        },
        {
          name: "Folic Acid",
          id: "folic-acid",
          inputName: "folicAcid",
          rda: 400,
          measurement: "mcg",
          total: 0
        },
        {
          name: "Iodine",
          id: "iodine",
          inputName: "iodine",
          rda: 150,
          measurement: "mcg",
          total: 0
        },
        {
          name: "Iron",
          id: "iron",
          inputName: "iron",
          rda: 8,
          measurement: "mg",
          total: 0
        },
        {
          name: "Magnesium",
          id: "magnesium",
          inputName: "magnesium",
          rda: 400,
          measurement: "mg",
          total: 0
        },
        {
          name: "Manganese",
          id: "manganese",
          inputName: "manganese",
          rda: 2.3,
          measurement: "mg",
          total: 0
        },
        {
          name: "Molybdenum",
          id: "molybdenum",
          inputName: "molybdenum",
          rda: 45,
          measurement: "mcg",
          total: 0
        },
        {
          name: "Phosphorus",
          id: "phosphorus",
          inputName: "phosphorus",
          rda: 700,
          measurement: "mg",
          total: 0
        },
        {
          name: "Potassium",
          id: "potassium",
          inputName: "potassium",
          rda: 4700,
          measurement: "mg",
          total: 0
        },
        {
          name: "Selenium",
          id: "selenium",
          inputName: "selenium",
          rda: 55,
          measurement: "mcg",
          total: 0
        },
        {
          name: "Salt",
          id: "salt",
          inputName: "salt",
          rda: 500,
          measurement: "mg",
          total: 0
        },
        {
          name: "Vitamin-D3",
          id: "vitamin-d3",
          inputName: "vitaminD3",
          rda: 10000,
          iuValue: 0,   
          measurement: "mcg",
          total: 0
        },
        {
          name: "Vitamin-D3",
          id: "vitamin-d3",
          inputName: "vitaminD3",
          rda: 10000,
          iuValue: 0,   
          measurement: "mcg",
          total: 0
        },
        {
          name: "Vitamin-E",
          id: "vitamin-e",
          inputName: "vitaminE",
          rda: 15,
          measurement: "mg",
          total: 0
        },
        {
          name: "Vitamin-K",
          id: "vitamin-k",
          inputName: "vitaminK",
          rda: 120,
          measurement: "mcg",
          total: 0
        },
        {
          name: "Zinc",
          id: "zinc",
          inputName: "zinc",
          rda: 11,
          measurement: "mg",
          total: 0
        }
      ],
      vitamins: [vitaminsObj.vitamins],
      totalsAreCalculated: false
    }

    //const { user } = this.props;
    // if (user.isAuthenticated && this.userHasMealsToday()) {     
    //   if (user.meals.some(meal => meal.foodDrinks.length)) {
    //     this.props.calculateTotals();
    //   }
    // }

    document.title = "Todays Totals";
  }



  componentDidMount(){
    const { user  } = this.props;

    // TODO 
    // Probalby detele this.
    // Use either reducer or context
    // totalsAreCalculated
    // if !totalsAreCalculated then perform this
    if (user.isAuthenticated) {
      this.beginCalculateTotalsChecks();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props;

    // Handles page refresh
    if (!prevProps.user.isAuthenticated && user.isAuthenticated) {
      this.beginCalculateTotalsChecks();
    }
  }


  userHasMealsToday = () => {
    const { user } = this.props;
    return user.meals && user.meals.length > 0;
  }

  someMealsAreNotEmpty = () => {
    return this.props.user.meals.map(meal => {
      meal.foodDrinks.some(fd => {
        return '_id' in fd;
      });
    });
  }

  beginCalculateTotalsChecks = () => {
      if (this.userHasMealsToday() && this.someMealsAreNotEmpty()) {
        let mealsToCalculate = this.props.user.meals.filter(meal => meal.foodDrinks.length);
        mealsToCalculate.forEach(({ foodDrinks }) => this.calculateTotals(foodDrinks));        
      } else {
        // User has no meals
        // Or all meals are empty
        // ... display message
      }
  }

  calculateTotals(mealsData) {
    let strippedMealsData = mealsData.map(meal => this.deleteNonVitaminsMineralsCalories(meal));


    this.setState(prevState => {
      let newState = {...prevState};

      let newVitaminsMineralsCalories = newState.vitaminsMineralsCalories.map((nutritionalDataObject, index) => {
        strippedMealsData.forEach(mealData => {
          nutritionalDataObject.total += mealData[nutritionalDataObject.inputName]
        });

        return nutritionalDataObject;
      });


      return { 
        ...prevState, 
        totalsAreCalculated: true,
        vitaminsMineralsCalories: [...newVitaminsMineralsCalories] 
      }
      
    }, () => console.log(this.state));
  }

  deleteNonVitaminsMineralsCalories = (foodDrink) => {
    delete foodDrink.servingSize;
    delete foodDrink.numOfServings;
    delete foodDrink.measurements;
    delete foodDrink.foodOrDrink;
    delete foodDrink.selectedMeasurement;
    delete foodDrink._id;
    delete foodDrink.name;

    return foodDrink;
  } 

  outputTodaysTotals = () => { 
  
    return this.state.vitaminsMineralsCalories.map((nutritionalDataObject, index) => {
      return <NutrientData 
                      name={nutritionalDataObject.name}
                      measurement={nutritionalDataObject.measurement}
                      total={nutritionalDataObject.total}
                      rda={nutritionalDataObject.rda}
                      key={index}  
                      showDetailsModal={ this.showVitaminDetailsModal  }
                      onClick={ () => { this.setState({ selectedVitamin: nutritionalDataObject.name }) }} /> 
    });
  }

  showVitaminDetailsModal = () => {    
    this.setState({ showVitaminDetailsModal: true });
  }

  render() {
    const { vitamins, userHasNoMeals } = this.state;
    const { user } = this.props;
    let Nutrients;
    let UserHasNoMealsMessage;
    
    if (!this.userHasMealsToday()) {
      UserHasNoMealsMessage = (<div>You haven't made any meals today.</div>);
    } else if (this.someMealsAreNotEmpty() && this.state.totalsAreCalculated) {
      Nutrients = this.outputTodaysTotals();
    }

    return (
      <div id="totals" className="view center-all" styles={styles}>
        <h1 className="view-title">{ this.state.title }</h1>
        <div className="totals-chart">
          {UserHasNoMealsMessage}
          {Nutrients}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    user: state.userReducers,
    showDetails: state.detailsReducers.showDetails
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setLoader: (load, text) => dispatch(setLoader(load, text)),
    toggleDetails: showDetails => { dispatch( toggleDetails(showDetails) ) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodaysTotals);
