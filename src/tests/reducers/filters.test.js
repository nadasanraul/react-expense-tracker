import filtersReducer from '../../reducers/filters';
import moment from 'moment'

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        endDateId: 'end',
        startDateId: 'start',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should setup sorby amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY', sortBy: 'amount'});
    expect(state).toEqual({
        text: '',
        endDateId: 'end',
        startDateId: 'start',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortby date', () => {
    const currentState = {
        text: '',
        endDateId: 'end',
        startDateId: 'start',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    };
    const action = {type: 'SORT_BY', sortBy: 'date'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text: 'rent'});
    expect(state.text).toBe('rent');
});

test('should set start date', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_START_DATE',
        startDate: moment(1000)
    });
    expect(state).toEqual({
        text: '',
        endDateId: 'end',
        startDateId: 'start',
        sortBy: 'date',
        startDate: moment(1000),
        endDate: moment().endOf('month')
    });
});

test('should set end date', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_END_DATE',
        endDate: moment(1000)
    });
    expect(state).toEqual({
        text: '',
        endDateId: 'end',
        startDateId: 'start',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment(1000)
    });
});