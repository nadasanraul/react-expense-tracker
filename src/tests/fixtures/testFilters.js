import moment from 'moment';

const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
    startDateId: 'start',
    endDateId: 'end'
}

const altFilters = {
    text: 'bill',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days'),
    startDateId: 'start',
    endDateId: 'end'
}

export { filters, altFilters};