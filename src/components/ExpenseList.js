import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <h2 className="text-center">No expenses</h2>
            ) : (
                props.expenses.map(expense => 
                    <ExpenseListItem key={expense.id} {...expense}/>
                )
            )
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    } 
};

export default connect(mapStateToProps)(ExpenseList);
