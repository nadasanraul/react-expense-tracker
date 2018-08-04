import React from 'react';
import {connect} from 'react-redux';
import  {startLogin} from '../actions/auth';

export const Login = ({startLogin}) => (
    <div className="w-100 h-100">
        <button onClick={startLogin} className="btn btn-primary d-flex justify-content-center" type="submit">Login</button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(Login);