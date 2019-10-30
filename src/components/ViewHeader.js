import React, { PropTypes } from 'react';
import Clock from "react-live-clock";

const ViewHeader = props => {

    return (
      <div className="view-header flex align-center space-between">
        {props.children}
      </div>
    );
    
}

export default ViewHeader;
