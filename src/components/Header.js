import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <div className="container">
            <NavLink to="/" className="navbar-brand">Expenses Tracker</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto ml-3">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" activeClassName="active" exact={true}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/create" className="nav-link" activeClassName="active">Add Expense</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/help" className="nav-link" activeClassName="active">Help</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Header;