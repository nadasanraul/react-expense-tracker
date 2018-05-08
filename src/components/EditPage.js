import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';

export class EditPage extends React.Component {

    onSubmit = expense => {
        this.props.startEditExpense(this.props.expense.id, expense)};

    onRemove = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.props.history.push('/');
    }

    render () {
        return (
            <div className="container">
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button className="btn btn-danger" onClick={
                    this.onRemove}
                >
                    Remove
                </button>
            </div>
        )
    }
}

// const EditPage = (props) =>  (
//     <div className="container">
//         <ExpenseForm 
//             expense={props.expense}
//             onSubmit={expense => {
//                 props.dispatch(editExpense(props.expense.id, expense));
//             }}
//         />
//         <button className="btn btn-danger" onClick={(e) => {
//             props.dispatch(removeExpense({id: props.expense.id}));
//             props.history.push('/');
//         }}>Remove</button>
//     </div>
// );

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find(expense => expense.id === props.match.params.id)
    }
};

const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id,expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: ({id}) => dispatch(startRemoveExpense({id}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);