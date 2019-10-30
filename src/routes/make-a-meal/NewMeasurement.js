// import React, { Component, PropTypes } from 'react';
// import {connect} from 'react-redux';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import * as styles from './styles.scss';
// import { setText, toggleAlert } from '../../../alert/alert_actions';
// import { setUser, setMeal } from '../../../user/user_actions';
// import configs from '../../../../configs'; 
// import { getVitamins } from '../../../../utilities/index.js';
// 
// export class NewMeasurement extends Component { 
// 
//   constructor(props) {
//     super(props);
//  
//     this.state = {
//       ...props,
//       showInput: false,
//       toggleInputText: 'New'
//     }
// 
//     this.handleOnChange = this.handleOnChange.bind(this);
//     this.toggleNewMeasurement = this.toggleNewMeasurement.bind(this);
//   }
// 
// 
// 
//   componentDidMount() {
//     console.log(this.props);
//   } 
// 
// 
// 
//   componentWillReceiveProps() {
// 
//   }
// 
// 
// 
//   handleOnChange(event) {
//     console.log(event.target.value);
//   }
// 
// 
// 
//   toggleNewMeasurement() {
//     if (this.state.showInput) {
//       this.setState({
//         toggleInputText: 'New',
//         showInput: false
//       });
//     } else { 
//       this.setState({
//         toggleInputText: 'Hide', 
//         showInput: true
//       });
//     }
//   }
// 
// 
// 
//   render() { 
//     //const props = this.props;
//     
//     return ( 
//       <div className="new-measurement">
//         <div className="new-measurement-add-text" onClick={this.toggleNewMeasurement}>{this.state.toggleInputText}</div>
//         <div className={`new-measurement-input ${this.props.newMeasurementId === this.props.activeConsumabledId ? 'show-new-measurement-input' : ''} `}>
//           <input className={this.state.showInput ? 'show-input' : ''} type="text" name="new-measurement" value={this.props.newMeasurement} 
//                  onChange={this.props.handleOnChange } />
//         </div> 
//       </div>
//     );
//   }
// }
// 
// const mapStateToProps = (state) => {
//   return {
//     showAlert: state.alertReducers.showAlert,
//     user: state.userReducers
//   }
// };
// 
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setAlertText: ( title, body ) => { dispatch( setText( title, body ) ) },
//     toggleAlert: ( showAlert ) => { dispatch( toggleAlert( showAlert ) ) }
//   }
// };
// 
// export default connect(mapStateToProps, mapDispatchToProps)(NewMeasurement);