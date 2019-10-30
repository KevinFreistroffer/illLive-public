import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import FormError from '../../components/FormError';
import { Input } from 'antd';

const StaySignedIn = ({handleRememberMeOnChange}) => {

    return (
          <div className="form-group">
            <label htmlFor="stay-signed-in">
              Stay Signed In?
              <input
                onChange={handleRememberMeOnChange}
                type="checkbox"
                name="stay-logged-in"
                id="stay-signed-in"
              />
            </label>
          </div>
    );
};

StaySignedIn.displayName = 'StaySignedIn';

StaySignedIn.propTypes = {
    handleRememberMeOnChange: PropTypes.func
};

export default StaySignedIn;
