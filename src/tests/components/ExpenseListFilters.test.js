import React from 'react';
import {shallow} from "enzyme";
import {filters, otherFilters} from "../fixtures/filters";
import {ExpenseListFilters} from "../../components/ExpenseListFilters";
import moment from "moment";

let setFilterText, setStartDate, setEndDate, sortByDate, sortByAmount, wrapper;

beforeEach(() => {
    setFilterText = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    wrapper = shallow(<ExpenseListFilters 
            setFilterText={setFilterText}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            filters={filters}
        />);
});

test("Should render expense list filters", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should render expense list filters with other filters", () => {
    wrapper.setProps({
        filters: otherFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test("Should handle text change", () => {
    const value = "Coffee";
    wrapper.find("input").simulate("change", {
        target: {value}
    });

    expect(setFilterText).toBeCalledWith(value);
});

test("Should handle date sort", () => {
    const value = "date";
    wrapper.find("select").simulate("change", {
        target: {value}
    });

    expect(sortByDate).toBeCalled();
});

test("Should handle amount sort", () => {
    const value = "amount";
    wrapper.find("select").simulate("change", {
        target: {value}
    });

    expect(sortByAmount).toBeCalled();
});

test("Should handle date changes", () => {
    const startDate = moment(0);
    const endDate = moment(1);
    wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({startDate, endDate});

    expect(setStartDate).toBeCalledWith(startDate);
    expect(setEndDate).toBeCalledWith(endDate);
});

test("Should handle date focus changes", () => {
    const focused = "startDate";
    wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(focused);

    expect(wrapper.state("calendarFocused")).toBe(focused);
});