import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import {startRemoveExpense} from '../actions/expenses';

export const ExpenseListItem = ({id, description, amount, createdAt, dispatch}) => (
    <div className="card border-primary mb-3">
        <div className="card-body">
            <h2 className="card-title">{description}</h2>
            <p className="card-text">Amount:{numeral(amount / 100).format('$0,0.00')} </p>
            <p className="card-text">On: {moment(createdAt).format('Do MMM, YYYY')}</p>
            <button className="btn btn-danger" onClick={(e) => {
                dispatch(startRemoveExpense({id}));
            }}>Remove</button>
            <Link to={`edit/${id}`} className="btn btn-info float-right">Edit</Link>
        </div>
    </div>
);

export default connect()(ExpenseListItem);