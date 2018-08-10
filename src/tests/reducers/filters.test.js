import filterReducer from "../../reducers/filters";
import moment from "moment";

test("Should set up default filter state", () => {
    const result = filterReducer(undefined, {type: "@@INIT"});
    expect(result).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    });
});

test("Should set up sort by amount", () => {
    const result = filterReducer(undefined, {type: "SORT_BY_AMOUNT"});
    expect(result.sortBy).toBe("amount");
});

test("Should set up sort by date", () => {
    const currentState = {
        text: "",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined
    };

    const result = filterReducer(undefined, {type: "SORT_BY_DATE"});
    expect(result.sortBy).toBe("date");
});

test("Should set text filter", () => {
    const action = {
        type: "SET_FILTER_TEXT",
        text: "text"
    }

    const result = filterReducer(undefined, action);
    expect(result.text).toBe("text");
});

test("Should set startDate", () => {
    const action = {
        type: "SET_START_DATE",
        startDate: moment(0)
    }

    const result = filterReducer(undefined, action);
    expect(result.startDate).toEqual(moment(0));
});

test("Should set endDate", () => {
    const action = {
        type: "SET_END_DATE",
        endDate: moment(0)
    }

    const result = filterReducer(undefined, action);
    expect(result.endDate).toEqual(moment(0));
});
