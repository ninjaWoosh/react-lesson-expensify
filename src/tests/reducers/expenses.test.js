import moment from "moment";
import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("Should set default state", () => {
    const state = expensesReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual([]);
});

test("Should remove expense by id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test("Should not remove expense if not found", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: "-1"
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test("Should add new expense", () => {
    const expense = {
        id: "4",
        description: "New expense",
        amount: 99,
        note: "",
        createdAt: moment(0).add(1, "days")
    };

    const action = {
        type: "ADD_EXPENSE",
        expense
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test("Should edit expense by id", () => {
    const updates = {
        description: "Yeah"
    };

    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[1].id,
        updates
    };

    const state = expensesReducer(expenses, action);
    expect(state[1].description).toEqual("Yeah");
});

test("Should not edit expense if not found", () => {
    const updates = {
        description: "Yeah"
    };

    const action = {
        type: "EDIT_EXPENSE",
        id: "-1",
        updates
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});