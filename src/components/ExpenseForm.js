import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import { create } from 'domain';

// // const date = new Date()
// const now = moment();
// console.log(now.format('Do MMM YYYY'));

export default class ExpenseForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString(): '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: {
                descriptionError: '',
                amountError: ''
            },
            success: ''
        };
    }

    onDescriptionChange = e => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = e => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onAmountChange = e => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };

    onDateChange = createdAt => {
        if(createdAt){
            this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description && !this.state.amount){
            //Set error state
            this.setState(() => ({
                error: {
                    descriptionError: 'Please provide a descrption',
                    amountError: 'Please Provide an amount'
                }
            }));
        } else if (!this.state.description){
            this.setState(() => ({
                error: {
                    descriptionError: 'Please provide a descrption',
                    amountError: ''
                }
            }));
        } else if (!this.state.amount){
            this.setState(() => ({
                error: {
                    descriptionError: '',
                    amountError: 'Please provide an amount'
                }
            }));
        } else {
            this.setState(() => ({
                error: {
                    descriptionError: '',
                    amountError: ''
                },
                success: 'You successfully added an expense'
            }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
            setTimeout(() => {
                this.setState(() => ({success: ''}));
            }, 3000);
        }
    };

    render(){
        return (
            <div>
                {
                    this.state.success &&
                    <div className="alert alert-success">
                        {this.state.success}
                    </div>
                }
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input 
                            type="text" 
                            className={`form-control ${this.state.error.descriptionError && 'is-invalid'}`} 
                            autoFocus 
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                        />
                        {
                            this.state.error.descriptionError && 
                            <small 
                                className="invalid-feedback"
                            >
                                {this.state.error.descriptionError}
                            </small>
                        }
                    </div>
                    <div className="form-group has-danger">
                        <label>Amount</label>
                        <input 
                            type="text" 
                            className={`form-control ${this.state.error.amountError && 'is-invalid'}`}
                            value={this.state.amount}
                            onChange={this.onAmountChange}
                        />
                        {
                            this.state.error.amountError && 
                            <small 
                                className="invalid-feedback"
                            >
                                {this.state.error.amountError}
                            </small>
                        }
                    </div>
                    <div className="form-group">
                        <label>Date</label><br/>
                        <SingleDatePicker 
                            date={this.state.createdAt}
                            onDateChange={this.onDateChange}
                            focused={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        />
                    </div>
                    <div className="form-group">
                        <label>Note</label>
                        <textarea 
                            placeholder="Add a note to your expenses(optional)"
                            className="form-control"
                            onChange={this.onNoteChange}
                            value={this.state.note}
                        >
                        </textarea>
                    </div>
                    <div className="form-group">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                        >
                            Add Expense
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}