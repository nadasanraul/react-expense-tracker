// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    payload: { text }
});

// SORT_BY
export const sortBy = (sortBy) => ({
    type: 'SORT_BY',
    payload: { sortBy }
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    payload: { startDate }
});

// SET_END_DATE
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    payload: { endDate }
});