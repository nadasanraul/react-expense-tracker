import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../actions/expenses';

export class AddExpense extends React.Component{
    onSubmit = expense => 
        //dispatch(addExpense(expense));
        this.props.addExpense(expense);
    
    render() {
        return (
            <div className="container">
                <h1>Add Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    addExpense: expense => dispatch(addExpense(expense))
});


export default connect(undefined, mapDispatchToProps)(AddExpense);