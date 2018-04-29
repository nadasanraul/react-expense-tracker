import {setTextFilter, sortBy, setStartDate, setEndDate} from '../../actions/filters';
import moment from 'moment';

test('should generate set start date action', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should generate set end date action', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should generate sort by action', () => {
    const action = sortBy('amount');
    expect(action).toEqual({
        type: 'SORT_BY',
        sortBy: 'amount'
    });
});

test('should generate text action with provided values', () => {
    const action = setTextFilter('rent');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'rent'
    });
});

test('should generate text action with default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});