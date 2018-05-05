import React from 'react';
import {shallow} from 'enzyme';
import {AddExpense} from '../../components/AddExpense';
import expenses from '../fixtures/testExpenses';

let startAddExpenseSpy, wrapper;

beforeEach(() => {
    startAddExpenseSpy = jest.fn();
    wrapper = shallow(<AddExpense startAddExpense={startAddExpenseSpy}/>);
});

test('should render AddExpense correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(startAddExpenseSpy).toHaveBeenLastCalledWith(expenses[1]);
})