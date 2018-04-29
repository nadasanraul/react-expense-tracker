import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import { filters, altFilters} from '../fixtures/testFilters.js';

let setTextFilterSpy, sortBySpy, setStartDateSpy, setEndDateSpy, wrapper;

beforeEach(() => {
    setTextFilterSpy = jest.fn();
    sortBySpy = jest.fn();
    setStartDateSpy = jest.fn();
    setEndDateSpy = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilterSpy}
            sortBy={sortBySpy}
            setStartDate={setStartDateSpy}
            setEndDate={setEndDateSpy}
        />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({filters: altFilters})
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'rent';
    wrapper.find('input').at(0).simulate('change', {
        target: {
            value
        }
    });
    expect(setTextFilterSpy).toHaveBeenLastCalledWith(value);
});

test('should handle sortBy', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: {
            value
        }
    });
    expect(sortBySpy).toHaveBeenLastCalledWith(value);
});

test('should handle date change', () => {
    const startDate = moment(0).add(1, 'weeks');
    const endDate = moment(0).add(2, 'weeks');
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});
    expect(setStartDateSpy).toHaveBeenLastCalledWith(startDate);
    expect(setEndDateSpy).toHaveBeenLastCalledWith(endDate);
});

test('should change calendar focused', () => {
    const focused =  'startDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focused);
    expect(wrapper.state('calendarFocused')).toBe(focused);
});
