import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import FormError from '../../components/FormError';
import { Input } from 'antd';

const Login = ({formGlobalError, error, handleOnChange, handleOnBlur }) => {

    return (
          <div className="form-group">
            <Input
              name="login"
              type="text"
              id="signin-login"
              className={
                error ? "form-error-input" : ""
              }
              placeholder="Username or email"
              autoComplete="on"
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              required
            />
            {!formGlobalError && error && <FormError>{error}</FormError>}
          </div>
    );
};

Login.displayName = 'Login';

Login.propTypes = {
    formGlobalError: PropTypes.string,
    error: PropTypes.string,
    handleOnChange: PropTypes.func,
    handleOnBlur: PropTypes.func
};

export default Login;
