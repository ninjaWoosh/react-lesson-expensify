import React from "react";
import 'react-dates/initialize';
import {DateRangePicker} from "react-dates";
import 'react-dates/lib/css/_datepicker.css';
import {connect} from "react-redux";
import {setFilterText, sortByAmount, sortByDate, setStartDate, setEndDate} from "../actions/filters";


export class ExpenseListFilters extends React.Component{
    state = {
        calendarFocused:null
    }

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({calendarFocused}));
    };

    onTextChange = (e) => {
        this.props.setFilterText(e.target.value);
    };

    onSortChange = (e) => {
        if(e.target.value === "date"){
            this.props.sortByDate();
        }else if(e.target.value === "amount"){
            this.props.sortByAmount();
        }
    };

    render(){
        return (
                <div>
                    <input type="text" 
                        value={this.props.filters.text}
                        onChange={this.onTextChange}/>

                    <select 
                        value={this.props.filters.sortBy}
                        onChange={this.onSortChange}>
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>
                    <DateRangePicker
                        startDateId="startDate"
                        startDate={this.props.filters.startDate}
                        endDateId="endDate"
                        endDate={this.props.filters.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                </div>
            );
    }
}

const mapStateToProps = (state) => (
    {
        filters: state.filters
    }
); 

const mapDispatchToProps = (dispatch) => ({
    setFilterText: (text) => dispatch(setFilterText(text)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);