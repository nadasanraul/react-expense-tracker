import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/testExpenses';

test('should render ExpenseForm corectly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render errors when no data is submited', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    const error = wrapper.state('error');
    expect(error.descriptionError.length).toBeGreaterThan(0);
    expect(error.amountError.length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should render descriptionError when no descritpion is provided', () => {
    const value = '100'
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    const error = wrapper.state('error');
    expect(error.descriptionError.length).toBeGreaterThan(0);
    expect(error.amountError.length).toBe(0);
    expect(wrapper).toMatchSnapshot();
});

test('should render amountError when no amount is provided', () => {
    const value = 'new value'
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    const error = wrapper.state('error');
    expect(error.descriptionError.length).toBe(0);
    expect(error.amountError.length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description when input changes', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm  />);
    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
    const value = 'new note'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid data', () => {
    const value = '120';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should not set amount if data is not valid', () => {
    const value = '120.000';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe('');
    expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit prop for valid form submision', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[2]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    const error = wrapper.state('error');
    expect(error.descriptionError).toBe('');
    expect(error.amountError).toBe('');
    expect(wrapper.state('success').length).toBeGreaterThan(0);
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[2].description,
        amount: expenses[2].amount,
        note: expenses[2].note,
        createdAt: expenses[2].createdAt
    });
});

test('should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
});