import {setStartDate, setEndDate, setFilterText, sortByAmount, sortByDate} from "../../actions/filters";
import moment from "moment";

test("Should set start date", () => {
    const result = setStartDate(moment(0));
    expect(result).toEqual({
        type: "SET_START_DATE",
        startDate: moment(0)
    });
});

test("Should set end date", () => {
    const result = setEndDate(moment(0));
    expect(result).toEqual({
        type: "SET_END_DATE",
        endDate: moment(0)
    });
});

test("Should set text", () => {
    const result = setFilterText("text");
    expect(result).toEqual({
        type: "SET_FILTER_TEXT",
        text: "text"
    });
});

test("Should call set filter text with default", () => {
    const result = setFilterText();
    expect(result).toEqual({
        type: "SET_FILTER_TEXT",
        text: ""
    });
});

test("Should return sort by amount action type", () => {
    const result = sortByAmount();
    expect(result).toEqual({
        type: "SORT_BY_AMOUNT"
    });
});

test("Should return sort by date action type", () => {
    const result = sortByDate();
    expect(result).toEqual({
        type: "SORT_BY_DATE"
    });
});