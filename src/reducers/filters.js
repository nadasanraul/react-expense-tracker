import moment from 'moment';
// Filters reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    startDateId: 'start',
    endDateId: 'end'
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {...state, text: action.payload.text};
        case 'SORT_BY':
            return  {...state, sortBy: action.payload.sortBy}
        case 'SET_START_DATE':
            return {...state, startDate: action.payload.startDate}
        case 'SET_END_DATE':
            return {...state, endDate: action.payload.endDate}
        default:
            return state;
    }
};