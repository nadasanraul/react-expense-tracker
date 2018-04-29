import React from 'react';
import {shallow} from 'enzyme';
import {AddExpense} from '../../components/AddExpense';
import expenses from '../fixtures/testExpenses';

let addExpenseSpy, wrapper;

beforeEach(() => {
    addExpenseSpy = jest.fn();
    wrapper = shallow(<AddExpense addExpense={addExpenseSpy}/>);
});

test('should render AddExpense correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[1]);
})