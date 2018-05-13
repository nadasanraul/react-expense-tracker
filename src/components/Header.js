import React from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom';
import {startLogout} from '../actions/auth';

export const Header = ({startLogout}) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <div className="container">
            <NavLink to="/" className="navbar-brand">Expenses Tracker</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto ml-3">
                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link" activeClassName="active">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/create" className="nav-link" activeClassName="active">Add Expense</NavLink>
                    </li>
                </ul>
                <button onClick={startLogout} className="btn btn-info">Logout</button>
            </div>
        </div>
    </nav>
);

const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);