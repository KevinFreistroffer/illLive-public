import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setLoader } from "../../actions/loading.actions";
import { beginConfirm24HourMealResetMessage } from "../../actions/user.actions";
import * as DashboardStyles from "./styles.scss";

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    document.title = "Dashboard";
  }

  componentDidMount() {}

  render() {
    // // If they're not signed in than no route to dashboard. Simply check if username is empty
    // // If they're signed in though not confirmed, route to confirm-account
    // //if ( !this.props.accountConfirmed ) return <Redirect to="/signin" />
    // if ( !this.props.user || !this.props.username || this.props.username === "" ) {
    //   console.log(`[Dashboard] this.props.user.username === ''. Should route to signin`);
    //   <Redirect to="/signin" />
    //   this.props.history.push('/signin');
    // }

    return (
      <div className="dashboard view-with-padding flex center-all" style={DashboardStyles}>
        {/* <div className="view-header"> */}
        {/*   <h1 className="view-title">Dashboard</h1> */}
        {/* </div> */}

        <div className="view-main flex center-all">
          <nav className="dashboard-menu flex center-all">
            <div className="dashboard-menu-route">
              <Link to="/add" className="flex">
                <div className="link-container flex center-all">
                  <i className="fas fa-apple-alt" />
                  <span>Add a Item</span>
                </div>
              </Link>
            </div>
            <div className="dashboard-menu-route">
              <Link to="/make-a-meal" className="flex">
                <i className="fas fa-blender" />
                <span>Make a Meal</span>
              </Link>
            </div>
            <div className="dashboard-menu-route">
              <Link to="/totals" className="flex">
                <i className="fas fa-box" />
                <span>Totals</span>
              </Link>
            </div>
            <div className="dashboard-menu-route">
              <Link to="/account" className="flex">
                <i className="fas fa-box" />
                <span>Account</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducers,
    accountConfirmed: state.userReducers.accountConfirmed,
    confirm24HourMealReset: state.userReducers.confirm24HourMealResetMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoader: (showing, text) => {
      dispatch(setLoader(showing, text));
    },
    beginConfirm24HourMealReset: () =>
      dispatch(beginConfirm24HourMealResetMessage())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
