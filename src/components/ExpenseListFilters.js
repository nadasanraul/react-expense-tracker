import React from 'react';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import {setTextFilter, sortBy, setStartDate, setEndDate} from '../actions/filters';

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (focused) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSortChange = (e) => {
        this.props.sortBy(e.target.value);
    };

    render(){
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input className="form-control" type="text" value={this.props.filters.text} onChange={this.onTextChange}/>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <select 
                            className="form-control"
                            onChange={this.onSortChange}
                            value={this.props.filters.sortBy}
                        >
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <DateRangePicker 
                        startDate={this.props.filters.startDate}
                        startDateId={this.props.filters.startDateId}
                        endDate={this.props.filters.endDate}
                        endDateId={this.props.filters.endDateId}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        showClearDates={true}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({filters: state.filters});

const mapDispatchToProps = dispatch => ({
    setTextFilter: text => dispatch(setTextFilter(text)),
    sortBy: value => dispatch(sortBy(value)),
    setStartDate: startDate => dispatch(setStartDate(startDate)),
    setEndDate: endDate => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);