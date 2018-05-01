import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectTotalExpenses from '../selectors/expenses-total';

 export const ExpensesSummary = props => (
    <div className="alert alert-dismissible alert-info">
        {
            props.expensesCount === 1 
                ? <strong>There is {props.expensesCount} expense, with a total of {numeral(props.expensesTotal / 100).format('$0,0.00')}</strong>
                : <strong>There are {props.expensesCount} expenses, with a total of {numeral(props.expensesTotal / 100).format('$0,0.00')}</strong>
        }
    </div>
);

const mapStateToProps = state => ({
    expensesCount: selectExpenses(state.expenses, state.filters).length,
    expensesTotal: selectTotalExpenses(selectExpenses(state.expenses, state.filters))
});

export default connect(mapStateToProps)(ExpensesSummary);